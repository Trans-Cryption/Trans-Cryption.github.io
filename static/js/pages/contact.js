/**
 * contact.js
 * Script pour gérer le formulaire de contact avec chiffrement
*/

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('anon-form');
  const feedback = document.getElementById('form-feedback');

  if (!form || !feedback) return;

  // Clé RSA publique pour le chiffrement
  const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp1O+S+0lb8IiWl/Fjhn9
AGWui9nPrgVLWx0jRAfrEU7XsR+BzIWlVm3BkVY0ENKG6bi4ljlBVLMxxFlWdPee
NIkpEGZi/uuYNrIOJuxDtWegklWyvcRqPv3DHEJGFMSz5cyGw1YHfEJsSKIdkP+e
Gkh9c+BHCAN8KxFM+rLvGb3/Rt2FcUx5juUBjwyeZWs0OqPZiENrKNg8iCa2uIPP
/M6V+bCtnYCzfsv6FAFpFtIHZDYg3uGTLkX1RPUDY+ULSr365KvD4opT3eMfPvGw
iJyGlqjOuBfNmdCplV90pRufY/It8TlVmJg8dDAqXXXcldGCxTZn5Z/jPNsxfDoO
lQIDAQAB
-----END PUBLIC KEY-----`;

  /**
   * Fonction pour chiffrer les données
   * @param {string} data - Données à chiffrer
   * @returns {Object} - Données et clé chiffrées
   */
  function encryptData(data) {
    // Génère une clé AES aléatoire
    const aesKey = CryptoJS.lib.WordArray.random(256/8).toString();
    
    // Chiffre les données avec AES
    const encryptedData = CryptoJS.AES.encrypt(data, aesKey).toString();
    
    // Chiffre la clé AES avec RSA
    const jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(publicKey);
    const encryptedKey = jsEncrypt.encrypt(aesKey);
    
    return {
      data: encryptedData,
      key: encryptedKey
    };
  }

  // Gestion de la soumission du formulaire
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Réinitialise le message de retour
    feedback.textContent = '';
    feedback.className = 'feedback';

    try {
      // Récupère toutes les données du formulaire
      const formData = new FormData(form);
      const jsonData = {};
      
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });
      
      // Ajoute un timestamp pour l'unicité
      jsonData.timestamp = new Date().toISOString();
      
      // Convertit en chaîne JSON
      const jsonString = JSON.stringify(jsonData);
      
      // Chiffre les données
      const encrypted = encryptData(jsonString);
      
      // Prépare les données pour l'envoi
      const sendFormData = new FormData();
      sendFormData.append('access_key', formData.get('access_key'));
      sendFormData.append('encrypted_data', encrypted.data);
      sendFormData.append('encrypted_key', encrypted.key);
      
      // Envoie à Web3Forms
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
