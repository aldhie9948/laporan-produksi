export interface SelectItem {
  group: string;
  groupItem: boolean;
  label: string;
  value: string;
}

export interface PlanReport {
  shift: string;
  no_plan: string;
  no_bagian: string;
  nama_area: string;
  tanggal: string;
  barang: string;
  operator: string;
  kode_mesin: string;
  satuan: string;
  plan: number;
  start: string;
  finish: string;
  "01": number;
  "02": number;
  "03": number;
  "04": number;
  "05": number;
  "06": number;
  "07": number;
  NG: number;
  OK: number;
  keterangan: string;
  lot: string;
  nama_depan: string;
  nama_belakang: string;
  nama_operator: string;
}
