export interface IProduto {
    id: number;
    nome_produto: string;
    preco: number;
    quantidade: number;
    imagem?: string| File | null;
}

export type IProdutoCreate = Omit<IProduto, "id">;