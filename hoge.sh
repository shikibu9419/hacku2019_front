echo -n https://api.mille-feuille.app | gcloud kms encrypt --plaintext-file=- --ciphertext-file=- --location=global --keyring=mille-feuille --key=map | base64
