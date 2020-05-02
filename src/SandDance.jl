module SandDance

using Electron, DataValues

import IteratorInterfaceExtensions, TableTraits, IterableTables, JSON, FilePaths

export SandDanceWindow

app = nothing

mutable struct SandDanceWindow
    w::Window

    function SandDanceWindow(data)
        TableTraits.isiterabletable(data) === false && error("'data' is not a table.")

        main_html_path = joinpath(FilePaths.@__PATH__, "..", "sanddanceapp", "build", "index.html")

        global app

        if app == nothing
            app = Application()
        end

        w = Window(app, main_html_path, options = Dict("title" => "SandDance"))

        it = IteratorInterfaceExtensions.getiterator(data)

        data_dict = [Dict{Symbol,Any}(c[1] => isa(c[2], DataValue) ? (isna(c[2]) ? nothing : get(c[2])) : c[2] for c in zip(keys(r), values(r))) for r in it]

        data = JSON.json(data_dict)

        code = "global.startApp($data)"

        run(w, code)

        new(w)
    end
end

end # module
