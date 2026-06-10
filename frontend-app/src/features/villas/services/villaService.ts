import { getVillaById, getVillas } from "@/api/villas";
import type { Villa, VillaFilters } from "@/features/villas/types/villa";

export function listVillas(filters: VillaFilters = {}): Promise<Villa[]> {
  return getVillas(filters);
}

export function getVilla(villaId: number | string): Promise<Villa> {
  return getVillaById(villaId);
}
