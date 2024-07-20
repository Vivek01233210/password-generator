import { useState } from 'react';
import copy from 'clipboard-copy';
import './App.css';

export default function App(){
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const generatePassword = (length, includeNumbers, includeSpecialChars) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*/\|()_-+=<>?';
    let validChars = charset;
    if (includeNumbers) validChars += numberChars;
    if (includeSpecialChars) validChars += specialChars;
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      password += validChars.charAt(randomIndex);
    }
    return password;
  };

  const handleGeneratePassword = () => {
    const password = generatePassword(passwordLength, includeNumbers, includeSpecialChars);
    setGeneratedPassword(password);
  };

  const handleCopyToClipboard = () => {
    copy(generatedPassword);
    alert('Password copied to clipboard!');
  };

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div>
        <label>Password Length:</label>
        <input
          type="number"
          value={passwordLength}
          onChange={(e) => setPasswordLength(parseInt(e.target.value, 10))}
        />
      </div>
      <div>
        <label>
          Include Numbers:
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
        </label>
      </div>
      <div>
        <label>
          Include Special Characters:
          <input
            type="checkbox"
            checked={includeSpecialChars}
            onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
          />
        </label>
      </div>
      <button onClick={handleGeneratePassword}>Generate Password</button>
      {generatedPassword && (
        <div>
          <h2>Generated Password:</h2>
          <input type="text" value={generatedPassword} readOnly />
          <button onClick={handleCopyToClipboard}>Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
};