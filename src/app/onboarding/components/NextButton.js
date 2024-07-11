import Link from 'next/link';
import styles from './NextButton.module.css';

export default function NextButton() {
    return (
        <div>  
            <Link href="/dashboard" className={styles.nextButton}>
                Continue to Dashboard
            </Link>
        </div>
    );
}