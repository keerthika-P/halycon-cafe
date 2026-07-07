import { motion } from "framer-motion";
import { ChefHat, Flame, Heart, Plus, Star } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useLikes } from "../context/LikesContext";

export default function FoodCard({ item }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const { addItem } = useCart();
  const { likedIds, toggleLike } = useLikes();
  const { isAuthenticated } = useAuth();

  const [justAdded, setJustAdded] = useState(false);

  const liked = likedIds?.has(item.id);
  const glow = item.categoryThemeColor || "#D4AF37";

  console.log("ITEM IMAGE =", item.imageUrl);

  const handleMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      rx: py * -8,
      ry: px * 10,
    });
  };

  const resetTilt = () => {
    setTilt({
      rx: 0,
      ry: 0,
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) return;

    await addItem(item.id, 1);

    setJustAdded(true);

    setTimeout(() => {
      setJustAdded(false);
    }, 900);
  };

  const handleLike = (e) => {
    e.preventDefault();

    if (!isAuthenticated) return;

    toggleLike(item.id);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      animate={{
        rotateX: tilt.rx,
        rotateY: tilt.ry,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 14,
      }}
      style={{
        perspective: 800,
      }}
      className="glass-card"
    >
      <Link
        to={`/food/${item.id}`}
        style={{
          display: "block",
          padding: 14,
          height: "100%",
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: 12,
            overflow: "hidden",
            aspectRatio: "4/3",
            background: "#0d1218",
            boxShadow: `0 0 30px -10px ${glow}55`,
          }}
        >
          <img
            src={item.imageUrl}
            alt={item.name}
            loading="lazy"
            onError={(e) => {
              console.log("Image Failed:", item.imageUrl);

              e.target.src = "/images/apple-juice.jpg";
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s ease",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              maxWidth: "75%",
            }}
          >
            {item.isTrending && (
              <Badge
                icon={<Flame size={11} />}
                label="Trending"
                color="#F97316"
              />
            )}

            {item.isChefSpecial && (
              <Badge
                icon={<ChefHat size={11} />}
                label="Chef Special"
                color="#D4AF37"
              />
            )}

            {item.isPopular && (
              <Badge
                icon={<Star size={11} />}
                label="Popular"
                color="#3B82F6"
              />
            )}
          </div>

          <button
            onClick={handleLike}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "none",
              background: "rgba(11,15,20,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Heart
              size={16}
              color={liked ? "#F14C6B" : "#ffffff"}
              fill={liked ? "#F14C6B" : "none"}
            />
          </button>
        </div>

        <div style={{ paddingTop: 12 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h4
              style={{
                color: "#ffffff",
                fontSize: 17,
              }}
            >
              {item.name}
            </h4>

            <span
              style={{
                color: "gold",
                fontWeight: 700,
              }}
            >
              ₹{item.price}
            </span>
          </div>

          <p
            style={{
              color: "#b8b8b8",
              fontSize: 13,
            }}
          >
            {item.description}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Star
                size={12}
                fill="gold"
                color="gold"
              />
              {item.rating}
            </span>

            <button
              onClick={handleAdd}
              style={{
                padding: "6px 12px",
                borderRadius: 50,
                border: "1px solid gold",
                background: justAdded ? "#22C55E" : "transparent",
                color: "#ffffff",
              }}
            >
              <Plus size={12} />
              {justAdded ? " Added" : " Add"}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function Badge({ icon, label, color }) {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 8px",
        borderRadius: 50,
        background: "#00000088",
        border: `1px solid ${color}`,
        color,
        fontSize: 10,
      }}
    >
      {icon}
      {label}
    </span>
  );
}