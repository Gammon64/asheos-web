"use server";

import { FetchError, http } from "@/lib/fetch";
import { AddressSchema, AddressState } from "@/zod/address.definitions";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function createAddress(
  prevState: AddressState,
  formData: FormData
): Promise<AddressState> {
  return handleAddressSave(formData);
}

export async function updateAddress(
  addressId: number,
  prevState: AddressState,
  formData: FormData
): Promise<AddressState> {
  return handleAddressSave(formData, addressId);
}

export async function deleteAddress(addressId: number) {
  try {
    // Chama o Backend (asheos-api)
    await http.delete(`/addresses/${addressId}`);

    //   Limpa o cache da página de perfil
    revalidatePath("/profile");
  } catch (error) {
    if (error instanceof FetchError) {
      console.error("Erro da API:", error.response.data);
      throw new Error("Erro da API ao deletar endereço.");
    }
    throw new Error("Ocorreu um erro no servidor. Tente novamente.");
  }
}

async function handleAddressSave(formData: FormData, addressId?: number) {
  const dataToValidate = {
    street: formData.get("street"),
    city: formData.get("city"),
    state: formData.get("state"),
    zipCode: formData.get("zipCode"),
  };
  const validateFields = AddressSchema.safeParse(dataToValidate);
  if (!validateFields.success) {
    return z.treeifyError(validateFields.error);
  }

  try {
    // Chama o Backend (asheos-api)
    if (!addressId) await http.post("/addresses", validateFields.data);
    else await http.put(`/addresses/${addressId}`, validateFields.data);
  } catch (error) {
    if (error instanceof FetchError) {
      console.error("Erro da API:", error.response.data);
      return { errors: ["Erro da API ao criar endereço."] };
    }
    return { errors: ["Ocorreu um erro no servidor. Tente novamente."] };
  }

  //   Limpa o cache da página de perfil
  revalidatePath("/profile");

  return { success: true };
}
