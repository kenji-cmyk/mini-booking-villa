import { apiRequest } from "@/api/client";
import { mapVilla } from "@/api/mappers";
import type { Villa, VillaSearchParams } from "@/api/types";

function toQueryString(params: VillaSearchParams): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export async function getVillas(params: VillaSearchParams = {}): Promise<Villa[]> {
  const villas = await apiRequest<unknown[]>(`/api/villas${toQueryString(params)}`);
  return villas.map((villa, index) => mapVilla(villa as Villa, index));
}

export async function getVillaById(villaId: number | string): Promise<Villa> {
  const villa = await apiRequest<unknown>(`/api/villas/${villaId}`);
  return mapVilla(villa as Villa);
}
