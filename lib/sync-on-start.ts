// Runs once on deploy to sync Google Sheets data
import { syncFromGoogleSheets } from './sync'

async function main() {
  console.log('[deploy] Running post-deploy Google Sheets sync…')
  try {
    const result = await syncFromGoogleSheets()
    console.log(`[deploy] Sync complete: ${result.rowsUpdated} rows, ${result.durationMs}ms`)
  } catch (error) {
    console.error('[deploy] Sync failed:', error)
    // Don't exit non-zero — app should still start
  }
  process.exit(0)
}

main()
