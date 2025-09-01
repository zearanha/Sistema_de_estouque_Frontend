import { Button, Alert, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import "../../styles/style.css";
import type { IProduto, IProdutoCreate } from "../../type/products";

function SecondPage() {
  const navigate = useNavigate();
  const { Title } = Typography;

  const [produto, setProduto] = useState<IProdutoCreate>({
    nome_produto: "",
    preco: 0,
    quantidade: 0,
    imagem: null,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (field: keyof IProduto, value: string | File | null) => {
    setProduto((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      setSuccess(null);

      const formData = new FormData();
      formData.append("nome_produto", produto.nome_produto);
      formData.append("preco", String(produto.preco)); // garante que seja string
      formData.append("quantidade", String(produto.quantidade));
      if (produto.imagem) {
        formData.append("imagem", produto.imagem);
      }

      const response = await api.post("/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("✅ Produto cadastrado com sucesso!");
      console.log("Produto cadastrado:", response.data);

      setProduto({
        nome_produto: "",
        preco: 0,
        quantidade: 0,
        imagem: null,
      });
    } catch (err: any) {
      console.error("Erro ao cadastrar produto:", err);

      if (err.response) {
        setError(err.response.data || "Erro no servidor.");
      } else {
        setError("Erro ao conectar com o servidor.");
      }
    }
  };

  return (
    <div id="container">
      <div id="menu">
        <Button
          className="button"
          type="text"
          onClick={() => navigate("/page2")}
          block
        >
          Adicionar produto
        </Button>
        <Button
          className="button"
          type="text"
          onClick={() => navigate("/")}
          block
        >
          Produtos
        </Button>
      </div>

      <div className="formContainer">
        <Title level={2}>Adicionar produto</Title>

        <input
          className="inputCustom"
          placeholder="Produto"
          value={produto.nome_produto}
          onChange={(e) => handleChange("nome_produto", e.target.value)}
        />
        <input
          className="inputCustom"
          placeholder="Preço"
          type="number"
          value={produto.preco}
          onChange={(e) => handleChange("preco", e.target.value)}
        />
        <input
          className="inputCustom"
          placeholder="Quantidade"
          type="number"
          value={produto.quantidade}
          onChange={(e) => handleChange("quantidade", e.target.value)}
        />
        <input
          className="inputFile"
          type="file"
          onChange={(e) =>
            handleChange("imagem", e.target.files ? e.target.files[0] : null)
          }
        />
        <Button
          className="buttonSubmit"
          type="primary"
          block
          onClick={handleSubmit}
        >
          Cadastrar
        </Button>

        {error && <Alert message={error} type="error" showIcon />}
        {success && <Alert message={success} type="success" showIcon />}
      </div>
    </div>
  );
}

export default SecondPage;
