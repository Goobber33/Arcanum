import styles from'./css/BattleAnnouncer.css';

const BattleAnnouncer = ({message}) => {
    const typedMessage = usetypedMessage
    return <div className ={styles.main}>
<div className={styles.message}>{typedMessage}</div>
</div>
}

export default BattleAnnouncer