# ✅ Setup Checklist

Follow these steps in order to get Ireland Underwater running:

## 1. Google Earth Engine Setup

- [ ] Sign up at https://code.earthengine.google.com/
- [ ] Create a Google Cloud project
- [ ] Enable Earth Engine API in Google Cloud Console
- [ ] Create a service account with "Earth Engine Resource Writer" role
- [ ] Download service account JSON key
- [ ] Register service account with Earth Engine

## 2. Project Configuration

- [ ] Copy template: `cp earth-engine-service-account.json.template earth-engine-service-account.json`
- [ ] Open `earth-engine-service-account.json` in your editor
- [ ] Paste the contents from your downloaded Google service account JSON
- [ ] Save the file
- [ ] Verify the file is in the project root (same level as package.json)

## 3. Dependencies

- [ ] Run `npm install` (if not already done)
- [ ] Verify no error messages

## 4. Test Run

- [ ] Run `npm run dev`
- [ ] Open browser to http://localhost:3000
- [ ] Check browser console (F12) for errors
- [ ] Wait for map to load (first time may take 30-60 seconds)

## 5. Verify Features

- [ ] Region dropdown works (try selecting different regions)
- [ ] Sea level slider moves smoothly
- [ ] Map updates when slider changes
- [ ] Terrain toggle button works (shows hillshade)
- [ ] Shelf toggle button works (shows yellow overlay)
- [ ] Reset button returns to default settings
- [ ] Map can be panned and zoomed

## 6. Troubleshooting

If map doesn't load:

- [ ] Check browser console for "Failed to initialize Earth Engine"
  - → Verify service account JSON is correct
  - → Check file is named exactly: `earth-engine-service-account.json`
  - → Make sure it's in the project root directory

- [ ] Check for "404" errors on tile requests
  - → Service account may not be registered with Earth Engine
  - → Visit https://code.earthengine.google.com/ and sign in

- [ ] Check for CORS errors
  - → Should not happen in development
  - → If it does, check Vite proxy configuration

- [ ] Map shows but tiles don't load
  - → Earth Engine may be processing (wait 1-2 minutes)
  - → Check Earth Engine quota hasn't been exceeded
  - → Verify ETOPO1 dataset is accessible

## 7. Production Deployment (Optional)

If deploying to Cloudflare Workers:

- [ ] Build the project: `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Configure Cloudflare Workers secrets for service account
- [ ] Update `src/lib/earthengine.ts` to read from environment variable
- [ ] Deploy: `npm run deploy`

## Need Help?

1. Check `SETUP.md` for detailed instructions
2. Check `QUICKSTART.md` for quick reference
3. Check `PROJECT_STRUCTURE.md` for architecture details
4. Check browser console (F12) for error messages
5. Check terminal/console for server-side errors

## Success Indicators

✅ Map loads with elevation colors (blue = water, green/brown = land)
✅ Moving sea level slider changes the map
✅ Clicking region dropdown changes the view
✅ Toggles work and show visual changes
✅ No error messages in browser console
✅ No error messages in terminal/console

## Common Mistakes

❌ Service account JSON not in project root
❌ Service account JSON has incorrect filename
❌ Service account not registered with Earth Engine
❌ Earth Engine API not enabled in Google Cloud
❌ Forgot to run `npm install`
❌ Using wrong Google Cloud project

## Time Estimates

- Google Earth Engine setup: **10-15 minutes** (first time)
- Project configuration: **2-3 minutes**
- First run (with tile generation): **1-2 minutes**
- Subsequent runs: **5-10 seconds**
