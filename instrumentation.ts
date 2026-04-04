export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { syncFromGoogleSheets } = await import('./lib/sync')
    syncFromGoogleSheets().catch(() => {})
  }
}
