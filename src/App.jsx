import { Box, Container, Stack, TextField, Typography } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useMemo, useState } from 'react'
import './App.css'

const darkPalette = {
  primary: { main: '#e6e1d6' },
  background: { default: '#1f1f1f', paper: '#2a2a2a' },
  text: { primary: '#f5f1ea', secondary: '#c9c2b7' },
  divider: 'rgba(245, 241, 234, 0.14)',
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: darkPalette.primary,
    background: darkPalette.background,
    text: darkPalette.text,
    divider: darkPalette.divider,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
})

function App() {
  const [text, setText] = useState('')

  const phoneticText = useMemo(() => {
    if (!text) return ''

    const digitMap = {
      '0': 'zero',
      '1': 'one',
      '2': 'two',
      '3': 'three',
      '4': 'four',
      '5': 'five',
      '6': 'six',
      '7': 'seven',
      '8': 'eight',
      '9': 'nine',
    }

    const punctuationMap = {
      '.': 'period',
      ',': 'comma',
      '?': 'question mark',
      '!': 'exclamation point',
      ':': 'colon',
      ';': 'semicolon',
      '-': 'dash',
      '_': 'underscore',
      '@': 'at sign',
      '#': 'hash',
      '$': 'dollar sign',
      '%': 'percent sign',
      '&': 'ampersand',
      '(': 'left parenthesis',
      ')': 'right parenthesis',
      '[': 'left bracket',
      ']': 'right bracket',
      '{': 'left brace',
      '}': 'right brace',
      '/': 'slash',
      '\\': 'backslash',
      '+': 'plus',
      '=': 'equals',
      '"': 'double quote',
      "'": 'apostrophe',
    }

    const tokens = []
    for (const char of text) {
      if (char === '\n') {
        tokens.push('new line')
        continue
      }

      if (char === ' ') {
        tokens.push('space')
        continue
      }

      if (digitMap[char]) {
        tokens.push(digitMap[char])
        continue
      }

      if (punctuationMap[char]) {
        tokens.push(punctuationMap[char])
        continue
      }

      if (/[a-z]/.test(char)) {
        tokens.push(`lowercase ${char}`)
        continue
      }

      if (/[A-Z]/.test(char)) {
        tokens.push(`uppercase ${char}`)
        continue
      }

      tokens.push(`symbol ${char}`)
    }

    return tokens.join(', ')
  }, [text])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }} align="center">
        <Stack spacing={4}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom color="text.primary">
              Enter the text you want to read
            </Typography>
            <Typography variant="body1" color="text.secondary">
            </Typography>
          </Box>

          <TextField
            label="Your text here"
            multiline
            minRows={4}
            variant="outlined"
            fullWidth
            value={text}
            onChange={(event) => setText(event.target.value)}
          />

          <Box>
            <Typography variant="overline" color="text.secondary">
              Large display
            </Typography>
            <Typography
              component="div"
              sx={{
                mt: 1,
                fontFamily: '"Roboto Mono", "Roboto", "Helvetica", "Arial", sans-serif',
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
                lineHeight: 1.4,
                letterSpacing: '0.2rem',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                px: { xs: 2, sm: 3 },
                py: { xs: 2, sm: 3 },
                minHeight: '6rem',
              }}
            >
              {text || 'Your text will appear here.'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="overline" color="text.secondary">
              Phonetic spelling
            </Typography>
            <Typography
              component="div"
              sx={{
                mt: 1,
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontSize: { xs: '1.05rem', sm: '1.15rem' },
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
              }}
            >
              {phoneticText || 'Each character spelled out phonetically will appear here.'}
            </Typography>
          </Box>
        </Stack>
      </Container>
    </ThemeProvider>
  )
}

export default App
