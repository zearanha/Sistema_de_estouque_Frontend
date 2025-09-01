import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/style.css";
import Charlo from "../../assets/charlo.jpg";
import api from "../../service/api";
import type{ IProduto } from "../../type/products"; // Importa a interface de um arquivo externo

function Home() {
  const [products, setProducts] = useState<IProduto[]>([]);
  const [showProducts, setShowProducts] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduto | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showProducts) {
      getProducts();
    }
  }, [showProducts]);

  async function getProducts() {
    try {
      const response = await api.get("/");
      setProducts(response.data.produtos);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  const handleEdit = (product: IProduto) => {
    setEditingProduct(product);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/${id}`);
      message.success("Produto deletado com sucesso");
      setEditingProduct(null);
      getProducts();
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      message.error("Erro ao deletar produto");
    }
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingProduct) return;

    const form = event.target as HTMLFormElement;
    const formData = new FormData();
    formData.append("nome_produto", (form.elements.namedItem("nome_produto") as HTMLInputElement).value);
    formData.append("preco", (form.elements.namedItem("preco") as HTMLInputElement).value);
    formData.append("quantidade", (form.elements.namedItem("quantidade") as HTMLInputElement).value);

    if (file) {
      formData.append("imagem", file);
    }

    try {
      await api.put(`/${editingProduct.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success("Produto atualizado com sucesso");
      setEditingProduct(null);
      setFile(null);
      getProducts();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      message.error("Erro ao atualizar produto");
    }
  };

  return (
    <div id="container">
      <div id="menu">
        <Button className="button" type="text" onClick={() => navigate("page2")} block>
          Adicionar produto
        </Button>
        <Button className="button" type="text" onClick={() => setShowProducts(true)} block>
          Produtos
        </Button>
      </div>

      <div id="listProducts">
        {editingProduct ? (
          <div className="editFormContainer">
            <h2>Editar Produto</h2>
            <form onSubmit={handleUpdate}>
              <div style={{ marginBottom: "15px" }}>
                <label>Nome</label>
                <input
                  className="inputCustom"
                  type="text"
                  name="nome_produto"
                  defaultValue={editingProduct.nome_produto}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label>Preço</label>
                <input
                  className="inputCustom"
                  type="number"
                  step={"0.01"}
                  name="preco"
                  defaultValue={editingProduct.preco}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label>Quantidade</label>
                <input
                  className="inputCustom"
                  type="number"
                  name="quantidade"
                  defaultValue={editingProduct.quantidade}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label>Imagem</label>
                <input
                  className="inputFile"
                  type="file"
                  name="imagem"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                {editingProduct.imagem && typeof editingProduct.imagem === "string" && (
                  <img
                    src={`http://localhost:3001/public/${editingProduct.imagem}`}
                    alt="preview"
                    width={150}
                    style={{ marginTop: "10px" }}
                  />
                )}
              </div>
              <div style={{ marginTop: "20px" }}>
                <button className="buttonSubmit" type="submit">Salvar</button>
                <Button danger onClick={() => handleDelete(editingProduct.id)} style={{ marginLeft: "10px" }}>
                  Deletar
                </Button>
                <Button onClick={() => setEditingProduct(null)} style={{ marginLeft: "10px" }}>
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        ) : showProducts ? (
          products.length > 0 ? (
            products.map((product) => (
              <div className="product" key={product.id}>
                <img
                  className="imgProduct"
                  src={`http://localhost:3001/public/${product.imagem}`}
                  alt={product.nome_produto}
                />
                <p>{product.nome_produto}</p>
                <p>{product.preco}</p>
                <p>{product.quantidade}</p>
                <Button type="link" onClick={() => handleEdit(product)}>
                  Editar
                </Button>
              </div>
            ))
          ) : (
            <p>Nenhum produto encontrado.</p>
          )
        ) : (
          <div className="divImgLogo">
            <img className="imgLogo" src={Charlo} alt="placeholder" width={600} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
