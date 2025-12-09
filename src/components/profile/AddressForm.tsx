'use client';

import { createAddress, updateAddress } from '@/actions/address';
import { Address } from '@/types/address';
import { AddressState } from '@/zod/address.definitions';
import { useActionState, useEffect, useRef } from 'react';
import H1 from '../H1';
import Input from '../Input';
import Label from '../Label';
import Modal from '../Modal';
import ErrorMessage from '../ErrorMessage';
import Button from '../Button';

interface Props {
    addressToEdit: Address | null; // Se null = Criar, Se objeto = Editar
    onCancel: () => void; // Para fechar o form ou limpar a seleção
    onSuccess: () => void; // Callback para avisar o pai que salvou
}

export default function AddressForm({ addressToEdit, onCancel, onSuccess }: Props) {
    const initialState: AddressState = {};

    // Lógica Dinâmica: Qual action usar?
    // Se tem ID, usamos o .bind para pre-fixar o ID na action de update
    const actionToUse = addressToEdit
        ? updateAddress.bind(null, addressToEdit.id)
        : createAddress;
    const [state, formAction, pending] = useActionState(actionToUse, initialState);

    const formRef = useRef<HTMLFormElement>(null);
    // Resetar o form quando mudar de "Criar" para "Editar" (ou vice-versa)
    useEffect(() => {
        if (!addressToEdit) {
            formRef.current?.reset();
        }
    }, [addressToEdit]);

    // Sucesso? Avisa o pai
    useEffect(() => {
        if (state.success) {
            if (!addressToEdit) formRef.current?.reset(); // Limpa apenas se for criação
            onSuccess();
        }
    }, [state.success, addressToEdit, onSuccess]);

    return (
        <Modal>
            <H1>
                {addressToEdit ? 'Editar Endereço' : 'Novo Endereço'}
            </H1>

            <form ref={formRef} action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Rua */}
                <div className="md:col-span-2">
                    <Label htmlFor='street'>Rua</Label>
                    <Input
                        id='street'
                        name="street"
                        type='text'
                        defaultValue={addressToEdit?.street}
                        required
                    />
                    {state.properties?.street &&
                        state.properties.street.errors.map((error) => (
                            <p className="text-red-500 text-sm mt-1">{error}</p>
                        ))}
                </div>

                {/* Cidade */}
                <div className="md:col-span-2">
                    <Label >Cidade</Label>
                    <Input
                        name="city"
                        defaultValue={addressToEdit?.city}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {state.properties?.city &&
                        state.properties.city.errors.map((error) => (
                            <p className="text-red-500 text-sm mt-1">{error}</p>
                        ))}
                </div>

                {/* Estado */}
                <div>
                    <Label >Estado (UF)</Label>
                    <Input
                        name="state"
                        defaultValue={addressToEdit?.state}
                        className="w-full p-2 border rounded"
                        maxLength={2}
                        required
                    />
                    {state.properties?.state &&
                        state.properties.state.errors.map((error) => (
                            <p className="text-red-500 text-sm mt-1">{error}</p>
                        ))}
                </div>

                {/* CEP */}
                <div>
                    <Label >CEP</Label>
                    <Input
                        name="zipCode"
                        defaultValue={addressToEdit?.zipCode}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {state.properties?.zipCode &&
                        state.properties.zipCode.errors.map((error) => (
                            <p className="text-red-500 text-sm mt-1">{error}</p>
                        ))}
                </div>

                {/* Botões */}
                <div className="md:col-span-2 flex gap-2 justify-end mt-2">
                    <Button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded"
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="submit"
                        disabled={pending}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        {pending ? 'Salvando...' : (addressToEdit ? 'Atualizar' : 'Cadastrar')}
                    </Button>
                </div>

                {/* Exibição de Erro */}
                {state.errors &&
                    state.errors.map((error, index) => (
                        <ErrorMessage key={index}>{error}</ErrorMessage>
                    ))}
            </form>
        </Modal>
    );
}