// Create an Init Function to Populate Demographic Info, Horizontal Bar Chart and Bubble Chart with Data from the First Sample in the Dataset
// Init Function also Populates Dropdown Menu with Array of all Sample Names
function init (sample) {    

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

        // Dropdown Element
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

function optionChange (newSample) {

    // Demographic Info Panel


    // 
}

// Initialize Dashboard
init();