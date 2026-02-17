package com.cropmarket

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import java.util.Locale

data class SearchResult(
    val status: String,
    val message: String
)

class MainViewModel : ViewModel() {

    private val commodityAliases = mapOf(
        "wheat" to "WHEAT",
        "गेहूं" to "WHEAT",
        "rice" to "RICE",
        "paddy" to "PADDY",
        "cotton" to "COTTON"
    )

    private val marketData = mapOf(
        "WHEAT" to mapOf("general" to 2400, "pune" to 2520, "nagpur" to 2480),
        "RICE" to mapOf("general" to 2200, "pune" to 2280),
        "PADDY" to mapOf("general" to 1950),
        "COTTON" to mapOf("general" to 6200, "akola" to 6400)
    )

    private val _searchResult = MutableLiveData(SearchResult("Idle", "Search for crop prices."))
    val searchResult: LiveData<SearchResult> = _searchResult

    private val _watchlist = MutableLiveData<List<String>>(emptyList())
    val watchlist: LiveData<List<String>> = _watchlist

    private var lastQuery: Pair<String, String>? = null

    fun searchPrice(cropInput: String, districtInput: String) {
        lastQuery = cropInput to districtInput
        val crop = normalizeCrop(cropInput)
        val district = districtInput.trim().lowercase(Locale.getDefault())
        val cropRecord = marketData[crop]

        if (cropRecord == null) {
            _searchResult.value = SearchResult("Error", "No data for crop: $crop")
            return
        }

        val districtPrice = cropRecord[district]
        if (district.isNotEmpty() && districtPrice != null) {
            _searchResult.value = SearchResult("Success", "$crop in $district: ₹$districtPrice")
            return
        }

        val fallback = cropRecord["general"]
        if (fallback != null) {
            val where = if (district.isBlank()) "general" else "$district (fallback: general)"
            _searchResult.value = SearchResult("Success", "$crop in $where: ₹$fallback")
        } else {
            _searchResult.value = SearchResult("Error", "No fallback data found for $crop")
        }
    }

    fun retryLastSearch() {
        val query = lastQuery ?: return
        searchPrice(query.first, query.second)
    }

    fun addWatch(cropInput: String, districtInput: String) {
        val crop = normalizeCrop(cropInput)
        val district = districtInput.trim().lowercase(Locale.getDefault())
        val cropData = marketData[crop] ?: return
        val currentPrice = cropData[district] ?: cropData["general"] ?: return

        val item = "$crop @ ${if (district.isBlank()) "general" else district} | last: ₹$currentPrice"
        val updated = _watchlist.value.orEmpty().toMutableList().apply { add(item) }
        _watchlist.value = updated
    }

    fun convert(value: Double, from: String, to: String): String {
        val toAcre = mapOf(
            "acre" to 1.0,
            "hectare" to 2.47105,
            "bigha" to 0.619834,
            "kanal" to 0.125,
            "guntha" to 0.025
        )

        val acres = value * (toAcre[from] ?: 1.0)
        val out = acres / (toAcre[to] ?: 1.0)
        return String.format(Locale.getDefault(), "%.4f %s", out, to)
    }

    private fun normalizeCrop(input: String): String {
        val key = input.trim().lowercase(Locale.getDefault())
        return commodityAliases[key] ?: key.uppercase(Locale.getDefault())
    }
}
