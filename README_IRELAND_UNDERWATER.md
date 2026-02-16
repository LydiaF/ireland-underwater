# 🌊 Ireland Underwater 🌊

**An Interactive Classroom Web App for Exploring Sea Level Changes**

![Built with TanStack Start](https://img.shields.io/badge/TanStack-Start-blue)
![Google Earth Engine](https://img.shields.io/badge/Google-Earth%20Engine-green)
![MapLibre GL JS](https://img.shields.io/badge/MapLibre-GL%20JS-orange)

---

## 🎯 What Is This?

Ireland Underwater is an educational web application that lets students explore what Ireland would look like with different sea levels. Using real elevation data from NOAA's ETOPO1 dataset and Google Earth Engine, students can:

- 🌍 See what Ireland looked like during the last ice age (sea level -100m)
- 🌊 Visualize climate change scenarios (sea level +50m, +100m, +200m)
- 🏖️ Explore the continental shelf around Ireland
- ⛰️ View terrain in 3D with hillshade visualization
- 📍 Jump to different regions (Dublin, Galway, Cork, Donegal)

**Perfect for:**
- Geography lessons
- Climate science education
- Geology and earth science
- History (ice age land bridges)
- Ages 8+ with teacher guidance

---

## 🚀 Quick Start

### Step 1: Get Google Earth Engine Access
1. Go to https://code.earthengine.google.com/
2. Sign up/register (free for educational use)
3. Follow the setup wizard

### Step 2: Create Service Account
1. Create a Google Cloud project
2. Enable Earth Engine API
3. Create a service account with Earth Engine access
4. Download the JSON key

### Step 3: Configure & Run
```bash
# Install dependencies
npm install

# Configure service account
cp earth-engine-service-account.json.template earth-engine-service-account.json
# Edit the file with your actual service account JSON

# Start the app
npm run dev

# Open http://localhost:3000
```

**First launch takes 30-60 seconds as tiles are generated.**

---

## 📚 Documentation

- **[CHECKLIST.md](CHECKLIST.md)** - Step-by-step setup verification
- **[QUICKSTART.md](QUICKSTART.md)** - Quick reference guide
- **[SETUP.md](SETUP.md)** - Detailed setup instructions
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Technical architecture

---

## 🎮 How to Use

### For Teachers

1. **Start with "All of Ireland"** - Show the full island
2. **Adjust sea level to -100m** - "This is what Ireland looked like 20,000 years ago during the ice age!"
3. **Back to 0m** - "This is today"
4. **Increase to +50m** - "What if the ice caps melted?"
5. **Toggle shelf highlight** - "See the shallow water around Ireland"
6. **Try different regions** - Focus on areas students know

### For Students

The interface is designed to be intuitive:

- **Big buttons** - Easy to click
- **Emojis** - Visual guides for what each button does
- **Smooth animations** - Map flies to new locations
- **Instant feedback** - See changes right away
- **Reset button** - Start over anytime

---

## 🔧 Technical Details

### Stack
- **Frontend**: React 19 + TanStack Start
- **Mapping**: MapLibre GL JS
- **Backend**: Google Earth Engine (Node.js SDK)
- **Data**: NOAA ETOPO1 bedrock elevation
- **Deployment**: Cloudflare Workers
- **Language**: TypeScript

### Features
- ✅ Server-side tile generation
- ✅ Tile caching (performance)
- ✅ Secure API key handling
- ✅ Full-screen responsive design
- ✅ Mobile-friendly controls
- ✅ Accessibility features
- ✅ No external dependencies for map tiles

### API Endpoints

**GET /api/regions**
- Returns list of available regions

**GET /api/tiles/:layer/:region/:z/:x/:y.png?sealevel=X**
- Serves map tiles from Earth Engine
- Layers: elevation, hillshade, shelf

**GET /api/value?lon=X&lat=Y**
- Returns elevation at specific coordinate

---

## 🌍 Data Source

Uses **NOAA NGDC ETOPO1** global relief model:
- Resolution: 1 arc-minute (~1.8 km)
- Coverage: Global (land + ocean)
- Type: Bedrock elevation (ice-free)
- Source: Google Earth Engine dataset `NOAA/NGDC/ETOPO1`

The data combines:
- Land topography from multiple sources
- Ocean bathymetry (seafloor depth)
- Quality-controlled and gridded

---

## 🎨 Kid-Friendly Design Philosophy

1. **Big Touch Targets** - Buttons sized for young users
2. **Visual Language** - Emojis convey meaning
3. **Immediate Feedback** - Changes happen right away
4. **No Jargon** - Simple, clear language
5. **Exploration Encouraged** - Can't "break" anything
6. **One Action Per Button** - Not overwhelming
7. **Helpful Hints** - Tip box explains purpose

---

## 🔐 Security & Privacy

- ✅ **No user data collected**
- ✅ **Service account key never exposed to client**
- ✅ **All Earth Engine calls server-side**
- ✅ **No tracking or analytics**
- ✅ **Safe for classroom use**
- ✅ **COPPA compliant** (no personal info)

---

## 📊 Educational Learning Outcomes

Students will:
- Understand elevation and sea level concepts
- Visualize climate change impacts
- Explore geographic features (bays, shelf, coastline)
- Learn about ice ages and geological time
- Practice map reading skills
- Use digital tools for scientific inquiry

Suitable for:
- Primary school (ages 8-12): Basic sea level concepts
- Secondary school (ages 13-18): Climate science, geology
- University: GIS, environmental science

---

## 🚢 Deployment

### Development
```bash
npm run dev
```

### Production (Cloudflare Workers)
```bash
npm run build
npm run deploy
```

**Production Notes:**
- Store service account as Cloudflare secret
- Configure environment variables
- Set up error logging
- Monitor Earth Engine quota
- Enable CORS if needed

---

## 🐛 Troubleshooting

### Map doesn't load
- Check service account JSON is correct
- Verify Earth Engine registration
- Wait 60 seconds for initial tile generation
- Check browser console for errors

### Tiles show as blank/gray
- Earth Engine may be processing (wait)
- Check Earth Engine quota
- Verify ETOPO1 dataset access

### Controls not responding
- Check browser console
- Try hard refresh (Ctrl+Shift+R)
- Clear cache

See [CHECKLIST.md](CHECKLIST.md) for detailed troubleshooting.

---

## 💡 Ideas for Classroom Activities

1. **Ice Age Exploration** - Set to -100m, discuss land bridges
2. **Future Coastlines** - Predict which cities would flood
3. **Continental Shelf** - Highlight shelf, discuss ocean zones
4. **Regional Comparison** - Compare Dublin vs Galway coastlines
5. **Climate Scenarios** - Research +2°C, +4°C sea level rise
6. **Map Skills** - Identify bays, peninsulas, islands
7. **Data Literacy** - Discuss where data comes from (ETOPO1)
8. **Creative Writing** - "A day in Ireland 20,000 years ago"

---

## 📜 License

Built for educational purposes.

**Data Attribution:**
- ETOPO1: NOAA National Geophysical Data Center
- Earth Engine: Google
- MapLibre GL JS: MapLibre Organization

---

## 🙏 Credits

- **Data**: NOAA NGDC ETOPO1
- **Platform**: Google Earth Engine
- **Framework**: TanStack Team
- **Mapping**: MapLibre GL JS
- **Runtime**: Cloudflare Workers

---

## 📧 Support

For setup help, check the documentation files:
1. Start with [CHECKLIST.md](CHECKLIST.md)
2. Then [QUICKSTART.md](QUICKSTART.md)
3. For details, see [SETUP.md](SETUP.md)

---

## 🎓 About This Project

Created as an educational tool to help students understand:
- The relationship between elevation and sea level
- The impacts of climate change on coastlines
- Geographic features of Ireland
- How scientists use data visualization

**Made with ❤️ for curious young minds**

---

## 🔮 Future Ideas

- [ ] Add more countries/regions
- [ ] Time slider for historical sea levels
- [ ] 3D terrain view
- [ ] Overlay population/city data
- [ ] Save and share views
- [ ] Export screenshots
- [ ] Comparison mode (before/after)
- [ ] Measurement tools (distance, area)
- [ ] Teacher dashboard with lesson plans

---

**Ready to explore? Let's dive in! 🌊**
