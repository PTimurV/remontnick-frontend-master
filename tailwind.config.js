module.exports = {
  important: true,
  content: ['./src/**/*.{js,ts,hbs}'],
  theme: {
    extend: {
      colors: {
        white: {
          DEFAULT: '#ffffff',
          32: '#f5f5f5',
          24: '#535353',
          12: '#383838',
          8: '#2F2F2F',
        },
        black: {
          DEFAULT: '#000000',
          87: '#2f2f2f',
          60: '#777777',
          32: '#b6b6b6',
          24: '#c2c2c2',
          12: '#ebebeb',
          8: '#ebebeb',
          4: '#f5f5f5',
          2: '#f6f6f6',
        },
        primary: {
          light: '#ffe0b2',
          DEFAULT: '#fcb147',
          dark: '#ef9e32',
          32: '#FFD494',
          24: '#ffeed4',
        },
        secondary: {
          light: '#1d1d1d',
          DEFAULT: '#1d1d1d',
          dark: '#1d1d1d',
        },
        on: {
          primary: '#1d1d1d',
          primaryVariants: '#1d1d1d',
          secondary: '#ffffff',
          background: '#1d1d1d',
          surface: '#1d1d1d',
          surface2: '#1d1d1d',
          error: '#ffffff',
          success: '#1d1d1d',
        },
        background: '#ffffff',
        surface: '#ffffff',
        surface2: '#fbfbfb',
        error: '#fc5647',
        success: '#92fc47',
      },
      screens: {
        sm: '320px',
        md: '768px',
        xl: '1440px',
        '2xl': '1920px',
        mdDown: {
          max: '767px',
        },
      },
      fontSize: {
        '4xs': '9px',
        '3xs': '10px',
        '2xs': '11px',
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '22px',
        '3xl': '24px',
        '4xl': '28px',
        '5xl': '36px',
      },
      lineHeight: {
        1: '15px',
        2: '17px',
        3: '18px',
        4: '20px',
        5: '21px',
        6: '22px',
        7: '23px',
        8: '24px',
        9: '27px',
        10: '31px',
        11: '35px',
        12: '45px',
      },
      letterSpacing: {
        0: 0,
        1: '0.1px',
        2: '0.15px',
        3: '0.25px',
        4: '0.4px',
        5: '0.5px',
        6: '1.25px',
        7: '1.5px',
      },
      fontFamily: {
        sans: ['Gotham Pro', 'sans-serif'],
      },
      transitionProperty: {
        height: 'height, max-height',
      },
      boxShadow: {
        md: '0px 3px 10px rgba(0, 0, 0, 0.12)',
        lg: '0px 5px 20px rgba(0, 0, 0, 0.08)',
      },
    },
  },
}