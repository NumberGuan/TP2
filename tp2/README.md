# 💡 Tips de Productividad - React App

Aplicación React que muestra tips de productividad aleatorios, permite votar los más útiles y visualiza el tip más valorado.

## 📋 Qué hace la aplicación

- **Muestra tips de productividad**: Presenta consejos prácticos para mejorar la productividad personal
- **Navegación aleatoria**: Botón para mostrar un tip aleatorio diferente (evita repetir el mismo consecutivamente)
- **Sistema de votos**: Los usuarios pueden votar los tips que les resulten más útiles
- **Ranking**: Muestra el tip con mayor cantidad de votos en una sección destacada
- **Persistencia**: Los votos se guardan en localStorage para mantenerse entre sesiones
- **Reinicio**: Opción para reiniciar todos los votos a cero

## 🚀 Cómo ejecutar

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd tp2
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador:**
   La aplicación estará disponible en `http://localhost:5173`

## ⚛️ Conceptos de React utilizados

### Hooks principales:
- **`useState`**: Manejo del estado para:
  - Índice del tip actual
  - Objeto de votos (clave: id del tip, valor: cantidad de votos)
  - Inicialización lazy desde localStorage

- **`useEffect`**: Persistencia de datos
  - Guarda automáticamente los votos en localStorage cada vez que cambian

### Patrones y técnicas:
- **Inmutabilidad del estado**: Nunca se modifica el estado directamente
  - Uso del spread operator para crear copias de objetos
  - Funcionalidad de actualización con callback (`setVotes(prev => ...)`)

- **Renderizado condicional**: Muestra mensaje alternativo cuando no hay votos

- **Estilos modernos**: CSS con nesting, gradientes, sombras y transiciones

### Estructura:
- Componente principal `App.jsx` con toda la lógica
- Array de tips definido fuera del componente (datos estáticos)
- Funciones helper para lógica de negocio (random sin repetición, cálculo de ganador)

## ✨ Características opcionales implementadas

- ✅ Evitar repetición consecutiva del mismo tip
- ✅ Botón para reiniciar votos
- ✅ Persistencia en localStorage
- ✅ Diseño visual mejorado con CSS moderno
- ✅ Responsive design

---

**Tecnologías:** React + Vite + CSS3
