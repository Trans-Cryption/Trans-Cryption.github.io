document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('anon-form');
  const feedback = document.getElementById('form-feedback');

  // Your RSA public key (generate a key pair and place the public key here)
  const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoYl7Lmc60QGEYE0p7utc
l4m/5wCd1kvRfAVRsb9OynMCU/dvedn30H6G0cEkYhYrGw6m1JI+WU5Bvf3vfphj
u/wwbDPbJa1V0NSSGZN0kR4UWmfjZgxzI8hgBkjZIaRHnXruBMjbUV8o2jRkcM7W
9IavxKPjKlntfiXlUU76Tg3bfsCul0ftf607liQextyMiDM/UI5Z1z2iv24q5OH2
GfD1mUCFtrx8hIo3hJ4HaA1VEj//k6tdcY1VYm3olMu/VK06Cuu8UePW+lFW6Ppd
qCkq1pBFb7oL5BsgUK3PnbpDj0wt0Z4xrzjFMbXfiPLNxME3GIvqAQtw9ObMaZ1+
aQIDAQAB
-----END PUBLIC KEY-----`;

  // Function to encrypt data using both AES and RSA
  function encryptData(data) {
    // Generate a random AES key
    const aesKey = CryptoJS.lib.WordArray.random(256/8).toString();
    
    // Encrypt the data with AES
    const encryptedData = CryptoJS.AES.encrypt(data, aesKey).toString();
    
    // Encrypt the AES key with RSA
    const jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(publicKey);
    const encryptedKey = jsEncrypt.encrypt(aesKey);
    
    return {
      data: encryptedData,
      key: encryptedKey
    };
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    feedback.textContent = '';
    feedback.className = 'feedback';

    try {
      // Get all form data as a JSON object
      const formData = new FormData(form);
      const jsonData = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });
      
      // Add timestamp for uniqueness
      jsonData.timestamp = new Date().toISOString();
      
      // Convert to string
      const jsonString = JSON.stringify(jsonData);
      
      // Encrypt the data
      const encrypted = encryptData(jsonString);
      
      // Prepare data for sending to web3forms
      const sendFormData = new FormData();
      sendFormData.append('access_key', formData.get('access_key'));
      sendFormData.append('encrypted_data', encrypted.data);
      sendFormData.append('encrypted_key', encrypted.key);
      
      // Send to web3forms
      const response = await fetch(form.action, {
        method: 'POST',
        body: sendFormData
      });
      
      if (!response.ok) throw new Error('Erreur réseau');
      
      const data = await response.json();
      if (data.success) {
        feedback.textContent = 'Merci pour ton message ! 🎉 (Message chiffré envoyé avec succès)';
        feedback.classList.add('show', 'success');
        form.reset();
      } else {
        throw new Error(data.message || 'Un problème est survenu');
      }
    } catch (err) {
      feedback.textContent = err.message;
      feedback.classList.add('show', 'error');
    }
  });
});
