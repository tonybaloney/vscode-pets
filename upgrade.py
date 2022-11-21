# upgrade to l10n
import json
import glob
import os.path

# Load the base nls file
with open('package.nls.json') as base_f:
    base = json.load(base_f)

# Write the bundle file
with open('l10n/bundle.l10n.json', 'w', encoding='utf-8') as bundle_f:
    bundle = {}
    for v in base.values():
        bundle[v] = v
    json.dump(bundle, bundle_f, indent=4, ensure_ascii=False)

# Get all package.nls.*.json files
for nls_file in glob.glob('package.nls.*.json'):
    with open(nls_file) as nls_f:
        lang = json.load(nls_f)
    bundle_name = nls_file.replace('package.nls.', 'bundle.l10n.')
    # Write the language file

    with open(os.path.join('l10n', bundle_name), 'w', encoding='utf-8') as bundle_f:
        bundle = {}
        for k, v in lang.items():
            bundle[base[k]] = v
        json.dump(bundle, bundle_f, indent=4, ensure_ascii=False)
