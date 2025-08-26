import { Input, Button } from "antd";
import { useEffect, useState } from "react";
import api from "../../service/api";

function SecondPage(){

    return(
        <>
            <Input placeholder="produto" variant='filled' />
            <Input placeholder="preço" variant='filled' />
            <Input placeholder="imagem" variant='filled' />
            <Input placeholder="quantidade" variant='filled'/>
            <Button type="primary" >Cadastrar</Button>
            

        </>
    )
}

export default SecondPage