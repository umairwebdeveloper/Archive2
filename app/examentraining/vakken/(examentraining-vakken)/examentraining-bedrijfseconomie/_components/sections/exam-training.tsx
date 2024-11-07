import { CheckCircle2 } from "lucide-react";
import { LuBrainCircuit } from "react-icons/lu";
import { AiOutlineStock } from "react-icons/ai";
import { FaBook, FaCheckCircle, FaSun } from "react-icons/fa";
import { CiSun } from "react-icons/ci";
import { FaPen } from "react-icons/fa";
import { LuShieldCheck } from "react-icons/lu";

const ExamTraining = () => {
  return (
    <>
      <div className="pt-5 md:pt-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center py-10 md:mb-10">
            <h2 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-4 md:mb-6">
              De voordelen van een examentraining
            </h2>

            <p className="text-gray-700 text-lg mb-4 md:mb-6 max-w-md">
              Een examentraining is onder andere geschikt voor leerlingen die moeite hebben met een of meerdere vakken,
              een goede cijferlijst nodig hebben voor een vervolgopleiding of die behoefte hebben aan extra zekerheid.
              Zo zitten er veel voordelen aan het volgen van een examentraining.
            </p>

            <div className="flex flex-col md:flex-row items-start justify-center gap-4 w-full">
              {/* Left container */}
              <div className="border border-gray-300 bg-white rounded-lg shadow-md flex flex-col items-start overflow-hidden max-w-[450px] md:max-w-[400px] w-full">
                {[
                  "🤫 Vol zelfvertrouwen de examens in",
                  "📈 Scoor gemiddeld 0,7 punt hoger",
                  "📝 Eigen ontwikkeld lesmateriaal: Gotutor Examenbundels",
                  "☀️ Elk weekend en alle schoolvakanties",
                  "📚 Alle vakken voor vmbo, havo en vwo",
                  "✅ Slagingsgarantie",
                ].map((text, index) => (
                  <div
                    key={index}
                    className="border-b border-[#efefef] flex items-center justify-center h-[70px] px-5 py-5 w-full"
                  >
                    <span className="text-lg font-medium text-gray-800 text-center">{text}</span>
                  </div>
                ))}
              </div>

              {/* Right container with icons */}
              <div className="border border-gray-300 bg-gradient-to-b from-[rgba(0,120,12,0.8)] to-[#00b612] rounded-lg shadow-md flex flex-col items-center overflow-hidden max-w-[450px] md:max-w-[400px] w-full">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="border-b border-[rgba(239,239,239,0.1)] flex items-center justify-center h-[70px] px-5 py-5 w-full"
                  >
                    <FaCheckCircle className="text-white text-2xl" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamTraining;
