import Card from '@/components/Card';
import H1 from '@/components/H1';
import Modal from '@/components/Modal';
import AddressManager from '@/components/profile/AddressManager';
import { http } from '@/lib/fetch';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Busca usuário e endereços em paralelo
async function getProfileData() {
    try {
        const [userRes, addrRes] = await Promise.all([
            http.get('/users/me'),
            http.get('/addresses')
        ]);

        return { user: userRes.data, addresses: addrRes.data };
    } catch (error) {
        console.error(error);
        return { user: null, addresses: [] };
    }
}

const ProfilePage = async () => {
    const { user, addresses } = await getProfileData();

    if (!user) notFound();

    return (
        <div className="flex gap-4">

            {/* Seção de Dados do Usuário (Read-Only por enquanto) */}
            <Modal>
                <div className="mb-4">
                    <Link href="/occurrences" className="text-blue-600 hover:underline">
                        &larr; Voltar para Ocorrências
                    </Link>
                </div>
                <Card>
                    <H1>Meu Perfil</H1>
                    <div>
                        <label className="block text-sm text-gray-500">Nome</label>
                        <p className="text-lg font-medium">{user.name}</p>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500">E-mail</label>
                        <p className="text-lg font-medium">{user.email}</p>
                    </div>
                </Card>
            </Modal>

            {/* Seção de Gerenciamento de Endereços */}
            <Modal>
                <AddressManager initialAddresses={addresses} />
            </Modal>
        </div>
    );
}
export default ProfilePage