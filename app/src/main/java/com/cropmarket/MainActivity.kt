package com.cropmarket

import android.os.Bundle
import android.widget.ArrayAdapter
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import com.cropmarket.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private val viewModel: MainViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupConverterSpinners()
        bindUi()
        observeViewModel()
    }

    private fun setupConverterSpinners() {
        val units = listOf("acre", "hectare", "bigha", "kanal", "guntha")
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, units)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        binding.fromUnit.adapter = adapter
        binding.toUnit.adapter = adapter
        binding.toUnit.setSelection(1)
    }

    private fun bindUi() {
        binding.searchBtn.setOnClickListener {
            viewModel.searchPrice(
                binding.cropInput.text.toString(),
                binding.districtInput.text.toString()
            )
        }

        binding.retryBtn.setOnClickListener {
            viewModel.retryLastSearch()
        }

        binding.addWatchBtn.setOnClickListener {
            viewModel.addWatch(
                binding.watchCropInput.text.toString(),
                binding.watchDistrictInput.text.toString()
            )
        }

        binding.convertBtn.setOnClickListener {
            val value = binding.unitValueInput.text.toString().toDoubleOrNull()
            if (value == null) {
                binding.convertResult.text = getString(R.string.invalid_input)
                return@setOnClickListener
            }

            val from = binding.fromUnit.selectedItem.toString()
            val to = binding.toUnit.selectedItem.toString()
            binding.convertResult.text = viewModel.convert(value, from, to)
        }
    }

    private fun observeViewModel() {
        viewModel.searchResult.observe(this) {
            binding.statusText.text = it.status
            binding.resultText.text = it.message
        }

        viewModel.watchlist.observe(this) { items ->
            binding.watchlistText.text = if (items.isEmpty()) {
                getString(R.string.watchlist_empty)
            } else {
                items.joinToString(separator = "\n")
            }
        }
    }
}
