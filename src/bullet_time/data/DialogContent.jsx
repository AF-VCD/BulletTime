import React from 'react';
import Typography from '@material-ui/core/Typography';

export const About = () => {
  const title = "About Bullet Time";
  const content = (
      <>
        <Typography gutterBottom>
          Bullet Time was created to ease the formatting burden that often accompanies Air Force style bullet writing. The application is not finished but new features are being added all the time. For now, Bullet Time offers the following:
        </Typography>
        <Typography gutterBottom>
          <h4>Auto-Spacing (Graberization)</h4>
          Bullet Time can automatically replace standard space characters with alternative whitespace characters in order to meet length requirements. These new characters are supported by PDF documents and will allow you to ensure your bullets fill an entire line exactly. Simply turn on "Graberization" and then copy and paste the bullets into your form. If you are working in a form with a different line width, change the Trim value in the Spacing Menu.
        </Typography>
        <Typography gutterBottom>
          <h4>Acronym/Abbreviation Replacement</h4>
        Bullet Time supports acronym/abbreviation recognition and replacement. As you write your bullet, if a word is <span className="acronym">highlighted green</span> you can right click it to get a list of approved replacements. Note: The list of approved replacements is not currently customizable but that feature is in the works.
        </Typography>
        <Typography gutterBottom>
          <h4>Datamuse Powered Thesaurus</h4>
          Bullet Time includes a thesaurus component powered by the <a href="https://www.datamuse.com/api/" target="_blank" rel="noopener noreferrer">Datamuse</a> API. Results are displayed based on datamuse's scoring algorithm. Unfortunately, the score given to each word isn't particularly meaningful for anything but ranking relevance. Clicking on a result will make it the new search term, allowing you to quickly find the right word for whatever you want your bullet to say.
          <h4>Auto-Save Option</h4>
          Bullet Time includes an auto-save feature. This will allow you to retain bullets and trim settings in between sessions, so long as you don't clear your browser's cache.
      </Typography>
    </>
  );

  return [title, content];
};

export const License = () => {
  const title = "License";
  const content = (
    <>
      <Typography gutterBottom>
        MIT License
        <br /><br />
        Copyright (c) 2020 Seeley Michael Pentecost
        <br /><br />
        Permission is hereby granted, free of charge, to any person obtaining a copy
        of this software and associated documentation files (the "Software"), to deal
        in the Software without restriction, including without limitation the rights
        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the Software is
        furnished to do so, subject to the following conditions:
        <br /><br />
        The above copyright notice and this permission notice shall be included in all
        copies or substantial portions of the Software.
        <br /><br />
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
        SOFTWARE.
      </Typography>
    </>
  );

  return [title, content];
};
