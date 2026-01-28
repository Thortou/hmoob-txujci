# 3D Book Opening Animation Component

A beautiful 3D book opening animation built with pure CSS transforms and React.

## ✨ Features

- ✅ **Pure CSS 3D transforms** - No external animation libraries
- ✅ **Smooth animation** - 1.2s cubic-bezier easing
- ✅ **Click to open/close** - Interactive book
- ✅ **Left and right pages** - Realistic book layout
- ✅ **Responsive design** - Works on mobile, tablet, and desktop
- ✅ **Customizable** - Custom colors, content, and styling
- ✅ **Modern UI** - Soft paper background gradient
- ✅ **TypeScript support** - Fully typed components

## 📦 Installation

The component is already installed in your project at:
```
src/components/Book3D.tsx
src/components/Book3D.css
```

## 🚀 Usage

### Basic Usage

```tsx
import Book3D from '@/components/Book3D';

export default function Page() {
    return <Book3D />;
}
```

### With Custom Props

```tsx
<Book3D
    title="My Book Title"
    author="Author Name"
    coverColor="#8B4513"
/>
```

### With Custom Content

```tsx
<Book3D
    title="Custom Book"
    author="John Doe"
    coverColor="#2563eb"
    frontCoverContent={
        <div className="p-6 text-white">
            <h3>Custom Cover</h3>
            <p>Your custom content</p>
        </div>
    }
    leftPageContent={
        <div className="p-4">
            <h4>Chapter 1</h4>
            <p>Your left page content...</p>
        </div>
    }
    rightPageContent={
        <div className="p-4">
            <h4>Chapter 2</h4>
            <p>Your right page content...</p>
        </div>
    }
/>
```

## 🎨 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"The Amazing Book"` | Book title displayed on cover |
| `author` | `string` | `"Author Name"` | Author name displayed on cover |
| `coverColor` | `string` | `"#8B4513"` | Background color of book cover |
| `frontCoverContent` | `ReactNode` | Default cover design | Custom front cover content |
| `leftPageContent` | `ReactNode` | Default left page | Custom left page content |
| `rightPageContent` | `ReactNode` | Default right page | Custom right page content |
| `className` | `string` | `""` | Additional CSS classes |

## 🎯 Demo Page

Visit the demo page to see examples:
```
http://localhost:3000/en/home/book-demo
```

Or:
```
http://localhost:3000/la/home/book-demo
```

## 📱 Responsive Breakpoints

- **Desktop**: 300px × 400px (default)
- **Tablet** (≤768px): 250px × 350px
- **Mobile** (≤480px): 200px × 300px

## 🎨 Customization Examples

### Different Cover Colors

```tsx
// Brown (default)
<Book3D coverColor="#8B4513" />

// Blue
<Book3D coverColor="#2563eb" />

// Red
<Book3D coverColor="#dc2626" />

// Green
<Book3D coverColor="#16a34a" />

// Purple
<Book3D coverColor="#9333ea" />
```

### Scale Variants

```tsx
// Smaller (75% scale)
<Book3D className="scale-75" />

// Larger (125% scale)
<Book3D className="scale-125" />
```

## 💡 Tips

1. **Custom Content**: Use `frontCoverContent`, `leftPageContent`, and `rightPageContent` for full customization
2. **Styling**: Add Tailwind classes via `className` prop for additional styling
3. **Animation**: The animation is CSS-based with `cubic-bezier(0.645, 0.045, 0.355, 1)` easing
4. **Performance**: Uses CSS transforms only - no JavaScript animation libraries needed
5. **Accessibility**: The book has `cursor: pointer` to indicate clickability

## 🔧 Technical Details

- **Transform Origin**: Left center for realistic opening
- **Perspective**: 1500px for 3D depth
- **Animation Duration**: 1.2s
- **Browser Support**: Modern browsers supporting CSS 3D transforms
- **Dependencies**: React only (no animation libraries)

## 📄 License

This component is part of your project and follows your project's license.
