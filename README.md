# Titus Lee's Personal Portfolio Website

Welcome to the repository for [Titus Hyunkyu Lee's personal portfolio website](https://tituslee.com), hosted on GitHub Pages. This website showcases my background, projects, and professional experience as an Electrical and Computer Engineering student at the University of Virginia.

## Overview

This portfolio is designed to give visitors an insight into my academic journey, professional skills, and key projects. It serves as a personal brand website, highlighting the following:

- **About Me**: A brief introduction to who I am, including my academic focus and career goals.
- **Experience**: A detailed look at my work experience, research, and teaching roles.
- **Education**: My degree program and study abroad coursework.
- **Skills**: Programming languages, simulation tools, and spoken languages.
- **Portfolio**: Thirteen hardware and software projects, each linking to its repository or design report.
- **Contact Information**: Details on how to get in touch with me for professional inquiries.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile.
- **Light and Dark Modes**: Follows the visitor's system preference and remembers their choice.
- **Project Filtering**: Filter the portfolio by Hardware or Software.
- **Accessible**: Keyboard-navigable tabs and menus, visible focus states, and alt text on every image.

## Tech Stack

- **HTML5/CSS3**: For building the structure and styling the website.
- **JavaScript**: Adding interactivity to elements, such as tabs, filtering, and the theme toggle.
- **GitHub Pages**: Hosting the website.

No build step and no frameworks — open `index.html` in a browser to run it locally.

## File Structure

```
index.html        Home, About (Experience / Education / Skills), Contact
portfolio.html    Project Portfolio with Hardware / Software filtering
base.css          Colors, type, navigation, footer
home.css          Hero, About, tabs
portfolio.css     Portfolio page and project cards
main.js           Theme toggle, navigation, tabs, scroll reveal
portfolio.js      Project filtering
images/           Project images and design reports
```

## How to Use

You can view the website live at [tituslee.com](https://tituslee.com). The repository is public, so feel free to fork or clone it if you are interested in using or learning from its structure.

### Setup Instructions

To run the website locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/titushyunkyu/tituslee-website.git
   ```
2. Navigate to the project directory:
   ```bash
   cd tituslee-website
   ```
3. Open `index.html` in your browser to view the website locally.

### Adding a Project

1. Add the project image to `images/`.
2. Copy an existing `<article class="project">` block in `portfolio.html` and update the image, title, description, and link.
3. Set `data-category` to either `Hardware` or `Software` so the filter picks it up.
4. Update the project count in the `.filter__count` and the eyebrow above the heading.

## Future Improvements

- Expand the projects section with additional portfolio pieces.
- Add a blog to share insights on topics related to electrical and computer engineering.

## Contact

Feel free to reach out if you have any questions or feedback!

- **Email**: [titushyunkyu1@gmail.com](mailto:titushyunkyu1@gmail.com)
- **LinkedIn**: [linkedin.com/in/titushyunkyu](https://linkedin.com/in/titushyunkyu)
