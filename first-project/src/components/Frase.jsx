import styles from './Frase.module.css'

const Frase = () => {
    return (
        <div className={styles.fraseContainer}>
            <h2 className={styles.fraseContent}>Frase de componente com arrow function</h2>
        </div>
    )
}

export default Frase;