# Website Text Highlighting Guide

## How This System Works

I've created a visual highlighting system that makes ALL text content in your HTML files easily identifiable. Here's what you'll see:

### Visual Indicators:

🟡 **Yellow Background + Red Text + Red Border** = **All visible text content**
🟢 **Green italic comments** = **Section descriptions**

### Example:
```html
<!-- BEFORE (Normal HTML) -->
<h1>Professional Plumbing Services You Can Trust</h1>

<!-- AFTER (With Highlighting) -->
<h1><span class="text-highlight">Professional Plumbing Services You Can Trust</span></h1>
<!-- .text-comment HERO SECTION TITLE -->
```

## What Gets Highlighted:

✅ **ALL text that users see on the website:**
- Page titles and headings
- Paragraphs and descriptions
- Button text
- Navigation links
- Contact information
- Service descriptions
- Form labels
- Footer content
- Phone numbers and emails

✅ **Section Comments:**
- Green comments explain what each section contains
- Helps you understand the page structure

## How to Use This:

1. **Open the highlighted HTML files** (they have "_highlighted" suffix)
2. **Look for yellow highlighted text** - that's all the content users see
3. **Edit the text between the `<span class="text-highlight">` tags**
4. **Remove the highlighting spans** when you're done editing

## File Structure:

📄 **index_highlighted.html** - Homepage with all text highlighted
📄 **about_highlighted.html** - About page with all text highlighted
📄 **services_highlighted.html** - Services page with all text highlighted
📄 **contact_highlighted.html** - Contact page with all text highlighted

## Example Search:

If you want to find "Emergency Services" on the homepage:
- **Before:** You had to search through hundreds of lines
- **Now:** Look for `<span class="text-highlight">Emergency Services</span>`

## Editing Process:

1. **Find text you want to change** (highlighted in yellow)
2. **Edit the text content** inside the span tags
3. **Remove the `<span class="text-highlight">` and `</span>` tags**
4. **Save the file** (without "_highlighted" in the name)

## Why This Helps:

🎯 **Easy identification** - No more guessing what text is editable
🎯 **Visual clarity** - Yellow highlighting makes text stand out
🎯 **Context preservation** - HTML structure remains intact
🎯 **Quick editing** - Just modify highlighted text

This system makes it IMPOSSIBLE to miss any text content in your website code!