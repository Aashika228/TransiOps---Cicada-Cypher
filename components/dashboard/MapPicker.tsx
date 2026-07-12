'use client'

import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin, Search, Navigation } from 'lucide-react'

// We create a custom divIcon so we don't rely on leaflet's default image paths which break in NextJS
const customIcon = L.divIcon({
  className: 'custom-leaflet-icon',
  html: `<div style="display:flex; flex-direction:column; align-items:center; transform: translate(-50%, -100%);">
          <div style="background-color:#059669; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border:3px solid white; box-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1);">
            <div style="width:12px; height:12px; background-color:white; border-radius:50%;"></div>
          </div>
          <div style="width:4px; height:12px; background-color:#059669; border-bottom-left-radius:4px; border-bottom-right-radius:4px;"></div>
         </div>`,
  iconSize: [0, 0],
  iconAnchor: [0, 0]
})

interface MapPickerProps {
  onLocationSelect: (location: string) => void;
}

// Component to programmatically update map view
function MapUpdater({ position }: { position: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(position, 13, { animate: true, duration: 1 })
  }, [position, map])
  return null
}

export default function MapPicker({ onLocationSelect }: MapPickerProps) {
  const [position, setPosition] = useState<[number, number]>([20.5937, 78.9629]) // Default India
  const [address, setAddress] = useState('Fetching location...')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  
  const isInitialMount = useRef(true)

  // Listens for clicks on the map to move the marker
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng])
      },
    })
    return <Marker position={position} icon={customIcon} />
  }

  // Reverse geocode whenever position changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      setAddress('Click on the map or search to drop a pin')
      return
    }

    const fetchAddress = async () => {
      setAddress('Locating...')
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position[0]}&lon=${position[1]}&zoom=18&addressdetails=1`)
        const data = await response.json()
        if (data && data.address) {
          const area = data.address.suburb || data.address.neighbourhood || data.address.city_district || data.address.town || data.address.city || data.name
          const state = data.address.state || ''
          const formatted = area ? `${area}, ${state}` : data.display_name.split(',').slice(0, 2).join(', ')
          setAddress(formatted)
          onLocationSelect(formatted)
        } else {
          setAddress('Unknown Location')
          onLocationSelect('Unknown Location')
        }
      } catch (error) {
        setAddress('Error fetching location')
        onLocationSelect('Coordinates: ' + position[0].toFixed(4) + ', ' + position[1].toFixed(4))
      }
    }
    
    // Add a small debounce
    const timeout = setTimeout(fetchAddress, 500)
    return () => clearTimeout(timeout)
  }, [position, onLocationSelect])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`)
      const data = await res.json()
      if (data && data.length > 0) {
        setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)])
      } else {
        alert("Location not found.")
      }
    } catch (error) {
      console.error("Search error", error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      setAddress('Finding your location...')
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude])
        },
        (err) => {
          alert("Could not access location. Please check browser permissions.")
          setAddress('Location access denied')
        }
      )
    } else {
      alert("Geolocation is not supported by your browser")
    }
  }

  return (
    <div className="w-full h-full relative">
      <MapContainer 
        center={position} 
        zoom={5} 
        style={{ width: '100%', height: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        <MapUpdater position={position} />
      </MapContainer>

      {/* Floating UI Elements */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-md px-4 flex flex-col gap-2 pointer-events-none">
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative shadow-lg rounded-xl overflow-hidden pointer-events-auto flex">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search for a city or place..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-3 bg-white/95 backdrop-blur-sm border-r border-slate-200/50 text-sm font-bold focus:outline-none text-slate-800"
            />
          </div>
          <button 
            type="submit" 
            disabled={isSearching}
            className="px-4 py-3 bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors disabled:opacity-70 whitespace-nowrap"
          >
            {isSearching ? '...' : 'Search'}
          </button>
        </form>

        {/* Address & Locate Me */}
        <div className="bg-white/95 backdrop-blur-md shadow-xl border border-slate-200/50 rounded-xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <MapPin className="h-4 w-4 text-emerald-600 animate-bounce" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Dropped Pin Location</p>
            <p className="text-sm font-bold text-slate-900 truncate">{address}</p>
          </div>
          <button 
            onClick={handleLocateMe}
            type="button"
            className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors pointer-events-auto shrink-0"
            title="Locate Me"
          >
            <Navigation className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
