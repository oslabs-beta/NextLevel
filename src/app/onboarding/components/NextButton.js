import Link from 'next/link';
import styles from './NextButton.module.css';

export default function NextButton(props) {
    return (
        <div>  
            <Link href={`/dashboard?username=${props.username}`} className={styles.nextButton}>
                Continue to Dashboard
            </Link>
        </div>
    );
}