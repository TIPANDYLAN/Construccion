// jestSetup.js
import { TextEncoder, TextDecoder } from 'util';

// Configurar TextEncoder y TextDecoder globalmente antes de importar MSW
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
