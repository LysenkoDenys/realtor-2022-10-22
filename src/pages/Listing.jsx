import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { addDoc, doc, Firestore, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { HiOutlineShare } from "react-icons/hi";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import { getAuth } from "firebase/auth";
import Contact from "../components/Contact";
import { Component } from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";

const Listing = () => {
  const params = useParams();
  const auth = getAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingID]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className=" relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="fixed top-[7%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <HiOutlineShare className="w-7 h-7 text-lg text-slate-500" />
      </div>
      {shareLinkCopied && (
        <p className="fixed top-[12%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 px-2 py-1">
          Link Copied
        </p>
      )}
      {/* main block 'flex-col md:flex-row' - for middle size it turns into row*/}
      <div className="m-4 p-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto rounded-lg shadow-lg bg-white lg:space-x-5">
        {/* text */}
        <div className="w-full">
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {listing.name}-$
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
            {listing.type === "rent" ? "/month" : ""}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            <FaMapMarkerAlt className="text-green-700 mr-1 text-white text-center" />
            {listing.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            {listing.offer && (
              <p className="bg-green-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
                ${+listing.regularPrice - +listing.discountedPrice} discount
              </p>
            )}
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description:</span>{" "}
            {listing.description}
          </p>
          <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6">
            <li className="flex items-center whitespace-nowrap ">
              <FaBed className="text-lg mr-1" />
              {+listing.bedrooms > 1 ? `${+listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap ">
              <FaBath className="text-lg mr-1" />
              {+listing.bathrooms > 1
                ? `${+listing.bathrooms} Bathrooms`
                : "1 Bathroom"}
            </li>
            <li className="flex items-center whitespace-nowrap ">
              <FaParking className="text-lg mr-1" />
              {listing.parking ? "Parking spot" : "No parking"}
            </li>
            <li className="flex items-center whitespace-nowrap ">
              <FaChair className="text-lg mr-1" />
              {+listing.furnished ? "Furnished" : "Not furnished"}
            </li>
          </ul>
          {/* ? - protect us from fast loading page */}
          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className="mt-6">
              <button
                onClick={() => setContactLandlord(true)}
                className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out"
              >
                Contact Landlord
              </button>
            </div>
          )}
          {contactLandlord && (
            // !Component does not execute:
            <Contact userRef={listing.userRef} listing={listing} />
          )}
        </div>
        {/* map */}
        <div className="w-full h-[200px] lg:h-[400px] md:h-[317px]  z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-1">
          <MapContainer
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>{listing.address}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
};

export default Listing;

//http://localhost:3000/category/rent/uZ7mt1ZjJNn4AjRMxcOL
