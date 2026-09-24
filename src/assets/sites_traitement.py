import requests
import json

api='https://hubeau.eaufrance.fr/api/v2/hydrometrie/referentiel/sites?format=geojson&size=10000'
r = requests.get(api)
content = r.json()

for feature in content["features"]:
    del feature["properties"]["latitude_site"]
    del feature["properties"]["premier_mois_annee_hydro_site"]
    del feature["properties"]["influence_generale_site"]
    del feature["properties"]["coordonnee_x_site"]
    del feature["properties"]["code_systeme_alti_site"]
    del feature["properties"]["code_region"]
    del feature["properties"]["type_contexte_loi_stat_site"]
    del feature["properties"]["code_entite_hydro_site"]
    del feature["properties"]["coordonnee_y_site"]
    del feature["properties"]["date_premiere_donnee_dispo_site"]
    del feature["properties"]["commentaire_influence_generale_site"]
    del feature["properties"]["longitude_site"]
    del feature["properties"]["premier_mois_etiage_site"]
    del feature["properties"]["grandeur_hydro"]
    del feature["properties"]["type_loi_site"]

    if(feature["properties"]["code_projection"] == 31 or feature["properties"]["code_projection"] == 52):
        newCoord=[feature["geometry"]["coordinates"][1],feature["geometry"]["coordinates"][0]]
        feature["geometry"]["coordinates"] = newCoord
        
    del feature["properties"]["code_projection"]
        
# newList=[]
# for i in range(len(content["features"])):
#    if (content["features"][i]["properties"]["surface_bv"] != None):
#        newList.append(content["features"][i])

# content["features"] = newList

print(len(content["features"]))

with open("sites.json", "w") as f:
    json.dump(content, f)

