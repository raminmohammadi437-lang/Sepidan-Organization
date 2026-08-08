tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"29LT Zarid Slab"', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        navy: '#0F1D2E',
        teal: '#00C2A8',
        mist: '#F2F4F7',
        ink: '#1D2939',
        muted: '#667085'
      },
      boxShadow: {
        soft: '0 18px 50px -28px rgba(15, 29, 46, 0.28)',
        panel: '0 12px 30px -24px rgba(15, 29, 46, 0.3)'
      },
      borderRadius: { '4xl': '2rem' },
      maxWidth: { shell: '1180px' }
    }
  }
};
