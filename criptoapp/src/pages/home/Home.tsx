import { BsSearch } from 'react-icons/bs';
import styles from './Home.module.css'
import { useEffect, useState, type SubmitEvent } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate()
  const [criptosData, setCriptosData] = useState<CriptosData[]>([]);
  const [inputCriptoName, setInputCriptoName] = useState<string>("");
  const [pageableCriptos, setPageableCriptos] = useState<number>(10);

  interface CriptosData {
    id:string,
    name:string,
    symbol:string,
    marketCapUsd: string,
    priceUsd: string,
    volumeUsd24Hr: string,
    changePercent24Hr: string
  }

  interface ResponseData{
    timestamp: number,
    data: CriptosData[];
  }

  useEffect(() => {
    getCriptosInfo()
  }, [pageableCriptos])

  const price = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })

  const priceCompacted = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact"
  })

  async function getCriptosInfo(){
    const response = await fetch(`https://rest.coincap.io/v3/assets?limit=${pageableCriptos}`)
    const responseJson:ResponseData = await response.json()
    console.log(responseJson)
    const responseCriptos:CriptosData[] = responseJson.data.map(cripto => {
      return {
        id: cripto.id,
        name: cripto.name,
        symbol: cripto.symbol,
        marketCapUsd: priceCompacted.format(Number(cripto.marketCapUsd)),
        priceUsd: price.format(Number(cripto.priceUsd)),
        volumeUsd24Hr: priceCompacted.format(Number(cripto.volumeUsd24Hr)),
        changePercent24Hr: Number(cripto.changePercent24Hr).toFixed(2)
      }
    })
    setCriptosData(responseCriptos)
    console.log(responseCriptos.slice(-10))
  }

function pesquisarNomeCripto(e: SubmitEvent) {
  e.preventDefault();
  if (inputCriptoName.trim() === "") return;
  const nomeBusca = inputCriptoName.toLowerCase().trim();
  const moedaEncontrada = criptosData.find(
    item => item.name.toLowerCase() === nomeBusca || item.id.toLowerCase() === nomeBusca
  );
  navigate(`/details/${nomeBusca}`, { 
    state: moedaEncontrada
  });
}

  function paginarMaisCriptos(){
    setPageableCriptos(pageableCriptos + 10)
    console.log(pageableCriptos)
  }

  return (
    <main className={styles.container}>
        <form action="" className={styles.form} onSubmit={pesquisarNomeCripto}>
          <input type="text" className={styles.formInput} placeholder='Digite o nome da moeda... Ex: bitcoin' value={inputCriptoName} onChange={e => setInputCriptoName(e.target.value)}/>
          <button type="submit" className={styles.formButton}>
            <BsSearch size={30} color='#fff'/>
          </button>
        </form>
        <table className={styles.tableCripto}>
              <thead>
                <tr>
                  <th scope='col' style={{textAlign: 'center'}}>Moeda</th>
                  <th scope='col'>Valor mercado</th>
                  <th scope='col'>Preço</th>
                  <th scope='col'>Volume</th>
                  <th scope='col'>Mudança 24h</th>
                </tr>
              </thead>
              <tbody>
                {criptosData.map((cripto) => (
                  <tr className={styles.infoCripto} key={cripto.id}>
                    <td>
                      <div className={styles.moedaInfo}>
                        <Link to={`details/${cripto.name}`} className={styles.linkCripto} state={cripto}>
                        <img src={`https://assets.coincap.io/assets/icons/${cripto.symbol.toLowerCase()}@2x.png`} alt="" />
                        <p style={{fontWeight: 'bolder'}}>{cripto.name} | {cripto.symbol}</p>
                        </Link>
                      </div>
                      </td>
                    <td>{cripto.marketCapUsd}</td>
                    <td>{cripto.priceUsd}</td>
                    <td>{cripto.volumeUsd24Hr}</td>
                    <td className={Number(cripto.changePercent24Hr) < 0 ? styles.changeBelow : styles.changeHigh} style={{fontWeight: 'bolder'}}>{cripto.changePercent24Hr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={paginarMaisCriptos} className={styles.btnPageable}>Visualizar mais criptos</button>
    </main>
  )
}

export default Home;
