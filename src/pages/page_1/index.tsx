import { Button } from "antd"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"
import Charlo from "../../assets/charlo.jpg"
import api from "../../service/api";

interface Product {
  id: number;
  nome_produto: string;
  preco: number;
  imagem: string;
  quantidade: number;
}

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    if (showProducts) {
      async function getProducts() {
        try {
          const response = await api.get("/produtos");
          setProducts(response.data.produtos);
          console.log(response.data.produtos);
        } catch (error) {
          console.error("Erro ao buscar produtos:", error);
        }
      }
      getProducts();
    }
  }, [showProducts]);

  const navigate = useNavigate();

  return (
    <div id="container">
      <div id="menu">
        <Button className="button" type="text" onClick={() => navigate("page2")} block>Adicionar produto</Button>
        <Button className="button" type="text" onClick={() => setShowProducts(true)} block>Produtos</Button>
      </div>
      <div id="listProducts">
        {showProducts ? (
          products.length > 0 ? (
            products.map((product) => (
              <div className="product" key={product.id}>
                <img 
                  className="imgProduct"
                  src={`http://localhost:3001/public/${product.imagem}`}
                  alt={product.nome_produto}
                  width={150}
                  height={150}
                />
                <p>{product.nome_produto}</p>
                <p>{product.preco}</p>
                <p>{product.quantidade}</p>
              </div>
            ))
          ) : (
            <p>Nenhum produto encontrado.</p>
          )
        ) : (
          <div>
            <img
              className="imgLogo"
              src={Charlo}
              alt="placeholder"
              width={600}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;