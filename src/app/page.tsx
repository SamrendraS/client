import styles from './page.module.css';
import karnotPng from '@public/karnot.png';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1 style={{ marginBottom: 10 }}>Endur</h1>
          <p>Liquid Staked STRK</p>
        </div>
        <p style={{ opacity: 0.4 }}>Launching soon</p>
        <div style={{ marginTop: '150px' }}>
          <p style={{ opacity: 0.4 }}>From the buidlers of</p>
          <div
            style={{
              display: 'flex',
              verticalAlign: 'middle',
              gap: '10px',
              marginTop: '20px',
            }}
          >
            <a href="https://karnot.xyz" target="_blank">
              <img src={karnotPng.src} alt="Karnot" height={'40px'} />
            </a>
            <a href="https://strkfarm.xyz" target="_blank">
              <img
                src="https://www.strkfarm.xyz/full-logo.svg"
                height={'34px'}
                style={{ marginTop: '3px' }}
                alt="STRKFarm"
              />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
