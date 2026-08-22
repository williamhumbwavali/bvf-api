import 'reflect-metadata'
import AppDataSource from '../../database/data-source'

import { seedGenres } from './genres.seed'

async function run() {
  try {
    await AppDataSource.initialize()

    console.log('Executando seeds...')

    await seedGenres(AppDataSource)

    console.log('Seeds executados com sucesso')
  } catch (error) {
    console.error('Erro ao executar seeds:', error)
    process.exit(1)
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy()
    }
  }
}

run()