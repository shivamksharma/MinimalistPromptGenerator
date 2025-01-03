import React from 'react';

const Documentation = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Documentation</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <p className="mb-4">
          Welcome to the Minimalist Prompt Generator! This tool allows you to create custom PS1 prompts for your terminal.
        </p>
        <h3 className="text-xl font-semibold mb-2">How to Use</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Drag elements from the sidebar to the visual editor.</li>
          <li>Customize each element's color and style.</li>
          <li>See your prompt changes instantly in the preview.</li>
          <li>Export or save your configuration.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Elements</h2>
        <p className="mb-4">
          The following elements are available for use in your prompt:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>h</strong>: Hostname (short)</li>
          <li><strong>H</strong>: Hostname (full)</li>
          <li><strong>u</strong>: Username</li>
          <li><strong>w</strong>: Current working directory</li>
           <li><strong>W</strong>: Current working directory (basename)</li>
          <li><strong>t</strong>: Time (12-hour format)</li>
           <li><strong>T</strong>: Time with seconds</li>
          <li><strong>d</strong>: Date</li>
          <li><strong>$</strong>: Exit status</li>
          <li><strong>space</strong>: Space</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Export Options</h2>
        <p className="mb-4">
          You can export your custom prompt in the following formats:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Plain Text</strong>: Copy the generated prompt code directly.</li>
          <li><strong>HTML Code Block</strong>: For use in documentation.</li>
          <li><strong>Markdown Code Block</strong>: Easily share in Markdown files.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Customization</h2>
        <p className="mb-4">
          You can customize the appearance of each element using the color picker and bold options.
        </p>
      </section>
    </div>
  );
};

export default Documentation; 