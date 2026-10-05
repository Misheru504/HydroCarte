import requests
import json
from os import path

try:
    api='https://hubeau.eaufrance.fr/api/v2/hydrometrie/referentiel/sites?format=geojson&size=10000'
    r = requests.get(api)
    r.raise_for_status()
    content = r.json()

    if(content["count"] != len(content["features"])):
        raise Exception("Le nombre de sites demandés et total diffère !")

    propertiesToKeep = [
        "code_cours_eau", 
        "statut_site", 
        "libelle_cours_eau", 
        "code_site", 
        "libelle_departement", 
        "code_departement", 
        "libelle_site", 
        "date_maj_site", 
        "libelle_commune", 
        "libelle_region"
        ]

    for feature in content["features"]:
        # Vérification du code de projection car l'API inverse latitude et longitude sur les codes 31 et 52
        if(feature["properties"]["code_projection"] == 31 or feature["properties"]["code_projection"] == 52):
            newCoord=[feature["geometry"]["coordinates"][1],feature["geometry"]["coordinates"][0]]
            feature["geometry"]["coordinates"] = newCoord

        feature["properties"] = {
            cle: valeur
            for cle, valeur in feature["properties"].items()
            if cle in propertiesToKeep
        }

    print("Nombre de sites :", len(content["features"]))

    with open("public/data/sites.geojson", "w") as f:
        json.dump(content, f)
except requests.exceptions.HTTPError as e:
    print("Erreur HTTP :", e)
except requests.exceptions.RequestException as e:
    print("Erreur requête :", e)
except Exception as e:
    print("Erreur :", e)

