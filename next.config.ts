import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/lib/intl/request.ts')

const nextConfig: NextConfig = {}

export default withNextIntl(nextConfig)
