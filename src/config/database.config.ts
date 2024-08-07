import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.SQLSRV_HOST,
  port: Number.parseInt(process.env.SQLSRV_PORT, 10),
  username: process.env.SQLSRV_USER,
  password: process.env.SQLSRV_PASS,
  database: process.env.SQLSRV_NAME,
  entities: ['dist/database/entities/*.entity{.ts,.js}'],
  synchronize: true,
  connectTimeout: 3000000,  // 5 min
  extra: {
    connectAttributes: {
      max_allowed_packet: '2gb' // หรือขนาดที่คุณต้องการ
    }
  }
};
const dataSource = new DataSource({ ...dataSourceOptions });
export default dataSource;
