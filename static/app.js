// Create Dropdown Menu
// Use D3 to Fetch Sample Data from JSON File
d3.json("static/data/samples.json").then((data) => {

    // Assign Sample Names to a Variable
    var names = data.names;

    // Select Dropdown Element and Assign it to a Variable
    var selector = d3.select("#selDataset");

    // Log Progress
    console.log(names);

    // Use the Array of Sample Names to Populate the Select Options Element within the Dropdown Element
    names.forEach((name) => {
    selector
        .append("option")
        .text(name)
        .property("value", name);
    });
});

// Create an Init Function to Populate Demographic Info, Horizontal Bar Chart and Bubble Chart with Data from the First Sample in the Dataset
function init () {    

    // Use D3 to Fetch Sample Data from JSON File
    d3.json("static/data/samples.json").then((data) => {

        // Log Progress
        console.log(data);

        // Demographic Info Panel
        // Select Panel and Assign it to a Variable
        var demoInfoPanel = d3.select("#sample-metadata");

        // Clear Existing Metadata
        demoInfoPanel.html("");

        // Add Metadata for First Sample to Panel
        Object.entries(data.metadata[0]).forEach(([key, value]) => {

            demoInfoPanel.append("p").text(`${key}: ${value}`);
        })

        // Chart Plotting
        // Assign Sample Values, Otu Ids, and Otu Labels to Variables for Bar Chart
        var sampleValues = data.samples[0].sample_values.slice(0, 10);
        var otuIds = data.samples[0].otu_ids.slice(0, 10);
        var otuLabels = data.samples[0].otu_labels.slice(0, 10);

        // Log Progress
        console.log(sampleValues);
        console.log(otuIds);
        console.log(otuLabels);

        // Assign Sample Values, Otu Ids, and Otu Labels to Variables for Bubble Chart
        var sampleValuesAll = data.samples[0].sample_values;
        var otuIdsAll = data.samples[0].otu_ids;
        var otuLabelsAll = data.samples[0].otu_labels;

        // Log Progress
        console.log(sampleValuesAll);
        console.log(otuIdsAll);
        console.log(otuLabelsAll);

        // Horizontal Bar Chart
        var data1 = [{
            x: sampleValues.reverse(),
            y: otuIds.reverse().map(id => `OTU ${id}`),
            hovertext: otuLabels.reverse(),
            hoverinfo: "text",
            type: "bar",
            orientation: "h"
        }];

        Plotly.plot("bar", data1);

        // Bubble Chart
        var data2 = [{
            x: otuIdsAll,
            y: sampleValuesAll,
            mode: "markers",
            marker: {
                size: sampleValuesAll,
                sizemode: "area",
                sizeref: "0.1",
                color: otuIdsAll,
                colorscale: "Earth"
            },
            text: otuLabelsAll
        }];

        Plotly.plot("bubble", data2);
    })
}

// Call OptionChange Function When a New Sample is Selected from Dropdown Menu
d3.selectAll("#selDataset").on("change", optionChange);

// Create an OptionChange Function to Populate Demographic Info, Horizontal Bar Chart and Bubble Chart with Data from the Selected Sample
function optionChange () {

    // Use D3 to Fetch Sample Data from JSON File
    d3.json("static/data/samples.json").then((data) => {

        // Use D3 to Select the Dropdown Menu
        var selector = d3.select("#selDataset");
        
        // Assign the Value of the Dropdown Menu Option to a Variable
        var newSample = selector.property("value");

        // Create an Index Variable to Filter Data for Selected New Sample
        var index = data.names.findIndex(d => d === newSample);

        // Log Progress
        console.log(index);

        // Demographic Info Panel
        // Select Panel and Assign it to a Variable
        var demoInfoPanel = d3.select("#sample-metadata");

        // Clear Existing Metadata
        demoInfoPanel.html("");

        // Add Metadata for Selected Sample to Panel
        Object.entries(data.metadata[index]).forEach(([key, value]) => {

            demoInfoPanel.append("p").text(`${key}: ${value}`);
        });

        // Chart Plotting
        // Assign Sample Values, Otu Ids, and Otu Labels to Variables for Bar Chart
        var sampleValues = data.samples[index].sample_values.slice(0, 10);
        var otuIds = data.samples[index].otu_ids.slice(0, 10);
        var otuLabels = data.samples[index].otu_labels.slice(0, 10);

        // Log Progress
        console.log(sampleValues);
        console.log(otuIds);
        console.log(otuLabels);

        // Assign Sample Values, Otu Ids, and Otu Labels to Variables for Bubble Chart
        var sampleValuesAll = data.samples[index].sample_values;
        var otuIdsAll = data.samples[index].otu_ids;
        var otuLabelsAll = data.samples[index].otu_labels;

        // Log Progress
        console.log(sampleValuesAll);
        console.log(otuIdsAll);
        console.log(otuLabelsAll);

        // Restyle Bar Chart
        Plotly.restyle("bar", "x", [sampleValues.reverse()]);
        Plotly.restyle("bar", "y", [otuIds.reverse().map(id => `OTU ${id}`)]);
        Plotly.restyle("bar", "hovertext", [otuLabels.reverse()]);

        // Restyle Bubble Chart
        Plotly.restyle("bubble", "x", [otuIdsAll]);
        Plotly.restyle("bubble", "y", [sampleValuesAll]);
        Plotly.restyle("bubble", "marker.size", [sampleValuesAll]);
        Plotly.restyle("bubble", "marker.color", [otuIdsAll]);
        Plotly.restyle("bubble", "text", otuLabelsAll);
    });
}

// Initialize Dashboard
init();