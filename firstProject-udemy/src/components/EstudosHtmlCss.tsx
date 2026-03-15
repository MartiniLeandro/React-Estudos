import './EstudosHtmlCss.css'



function Estudos(){
    return(
        /* 
        <div>
            <h2>Box-Sizing</h2>
            <div className="container">
                <p className="content">box-sizing</p>
            </div>
            <hr />
            <h2>Unidades de medida</h2>
            <p className='rem'>paragrafo utilizando o REM</p> 
            <div className="div-em">
                <p className='em'>paragrafo utilizando EM</p>      
            </div>    
            <hr />
            <div className="viewport">
                <p>paragrafo utilizando viewport</p>
            </div>
            <hr />
            <div className="porcentagem">
                <div>div utilizando porcentagem</div>
            </div>
        </div>
        */
        <div className="card-container">
        {/* O Selo precisa estar dentro do container para o absolute funcionar */}
        <span className="badge">20% OFF</span>
        
        <div className="image-placeholder">
            <div className="img-mock">Imagem</div>
        </div>

        <div className="card-body">
            <h3 className="title">Mouse Gamer RGB</h3>
            <p className="description">
            Alta precisão e ergonomia para suas partidas.
            </p>
            
            <button className="buy-button">
            Comprar
            </button>
        </div>
        </div>
    )
}

export default Estudos;