export interface Tag {
    id: number;
    name: string;
}
export interface TagsResponse {
    data: Tag[];
    length: number;
}