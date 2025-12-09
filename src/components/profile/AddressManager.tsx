'use client';

import { deleteAddress } from '@/actions/address';
import { Address } from '@/types/address';
import { useState } from 'react';
import Button from '../Button';
import Card from '../Card';
import DeleteButton from '../DeleteButton';
import AddressForm from './AddressForm';

interface Props {
    initialAddresses: Address[];
}

export default function AddressManager({ initialAddresses }: Props) {
    // Estado local para saber qual está sendo editado (null = nenhum/novo)
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);

    // Controle para exibir o formulário de criação
    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleEdit = (addr: Address) => {
        setEditingAddress(addr);
        setShowCreateForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Sobe a tela
    };

    const handleReset = () => {
        setEditingAddress(null);
        setShowCreateForm(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4 gap-2">
                <h2 className="text-xl font-semibold">Meus Endereços</h2>
                {!showCreateForm && (
                    <Button
                        onClick={() => setShowCreateForm(true)}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        Adicionar
                    </Button>
                )}
            </div>

            {/* Área do Formulário (Condicional) */}
            {showCreateForm && (
                <AddressForm
                    addressToEdit={editingAddress}
                    onCancel={handleReset}
                    onSuccess={handleReset}
                />
            )}

            {/* Lista de Endereços */}
            <div className="space-y-3">
                {initialAddresses.length === 0 && !showCreateForm && (
                    <p className="text-gray-500 italic">Nenhum endereço cadastrado.</p>
                )}

                {initialAddresses.map((addr) => (
                    <Card key={addr.id} className='space-y-2'>
                        <div>
                            <p className="font-medium text-gray-800 dark:text-gray-200">{addr.street}</p>
                            <p className="text-sm text-gray-600">{addr.city} - {addr.state}</p>
                            <p className="text-sm text-gray-500">CEP: {addr.zipCode}</p>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={() => handleEdit(addr)}
                                className="bg-blue-600 hover:bg-blue-800"
                            >
                                Editar
                            </Button>

                            {/* Botão de Delete */}
                            <DeleteButton
                                onClick={() => deleteAddress(addr.id)}
                            >
                                Excluir
                            </DeleteButton>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}