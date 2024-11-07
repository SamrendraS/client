import styles from './page.module.css';
import logoPng from '@public/logo.png';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            verticalAlign: 'middle',
            gap: '10px',
          }}
        >
          <img src={logoPng.src} alt="Endur" width={'63px'} />
          {/* <div>
          <h1 style={{ marginBottom: 10, fontSize: '50px'}}>Endur</h1>
          <p>xSTRK {'->'} Liquid Staked STRK</p>
        </div> */}
          <p style={{ opacity: 0.7, fontSize: '22px', fontWeight: '600' }}>
            Coming soon
          </p>
        </div>
        {/* <div style={{ marginTop: '100px' }}>
          <p style={{ opacity: 0.6 }}>From the buidlers of</p>
          <div
            style={{
              display: 'flex',
              verticalAlign: 'middle',
              gap: '30px',
              marginTop: '20px',
            }}
          >
            <a href="https://karnot.xyz" target="_blank">
              <img src={karnotPng.src} alt="Karnot" height={'30px'} />
            </a>
            <a href="https://strkfarm.xyz" target="_blank">
              <img src={strkfarmPng.src} alt="STRKFarm" height={'35px'} />
            </a>
          </div>
        </div> */}
        {/* <div 
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '15px'
          }}
        >
          <a href='https://t.me/+jWY71PfbMMIwMTBl'><img src='https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/telegram-white-icon.png' width={'50px'}/></a>
        </div> */}
      </main>
    </div>
  );
}
