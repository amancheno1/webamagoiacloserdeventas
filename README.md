# Running Agent IA - DeepSeek Integration

Un agente de inteligencia artificial especializado en running, integrado con DeepSeek y preparado para WordPress.

## Características

- 🏃‍♂️ Especializado en running y entrenamiento deportivo
- 🤖 Powered by DeepSeek AI
- 🎨 Diseño limpio y moderno con colores energéticos
- 📱 Completamente responsive
- 🔌 Fácil integración con WordPress
- ⚡ Acciones rápidas para consultas comunes

## Configuración

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
REACT_APP_DEEPSEEK_API_KEY=tu_api_key_de_deepseek
```

### 2. Instalación de Dependencias

```bash
npm install
```

### 3. Desarrollo Local

```bash
npm run dev
```

### 4. Compilación para Producción

```bash
npm run build
```

## Integración con WordPress

### Opción 1: Plugin Personalizado

1. Copia el archivo `src/wordpress-integration.php` a tu directorio de plugins de WordPress
2. Activa el plugin desde el panel de administración
3. Configura tu API key de DeepSeek en Ajustes > Running Agent IA
4. Usa el shortcode `[running_agent_ia]` en cualquier página o post

### Opción 2: Integración Manual

1. Compila el proyecto con `npm run build`
2. Sube los archivos de la carpeta `dist` a tu servidor
3. Incluye los archivos CSS y JS en tu tema de WordPress
4. Añade el contenedor HTML donde quieras mostrar el agente

## Funcionalidades del Agente

- **Planes de Entrenamiento**: Genera planes personalizados según objetivos
- **Técnica de Carrera**: Consejos para mejorar la forma y eficiencia
- **Prevención de Lesiones**: Estrategias para correr de forma segura
- **Nutrición Deportiva**: Recomendaciones alimentarias para runners

## API de DeepSeek

El agente utiliza la API de DeepSeek con las siguientes configuraciones:

- **Modelo**: deepseek-chat
- **Temperatura**: 0.7 (balance entre creatividad y precisión)
- **Max Tokens**: 1000
- **Contexto**: Especializado en running y deportes

## Personalización

### Colores del Tema

El diseño utiliza una paleta de colores energética:

- **Azul Principal**: #2563eb (blue-600)
- **Azul Secundario**: #1d4ed8 (blue-700)
- **Naranja Energético**: #ea580c (orange-500)
- **Naranja Hover**: #dc2626 (orange-600)

### Modificar el Prompt del Sistema

Edita el prompt en `src/components/RunningAgent.tsx` línea 45 para personalizar el comportamiento del agente.

## Soporte

Para soporte técnico o consultas sobre la integración, contacta al desarrollador.

## Licencia

Este proyecto está bajo licencia MIT.